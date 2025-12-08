import { Inngest } from "inngest";
import { User } from "../models/userModel.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "SmartHealthAssistant" });

// Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    
    return await step.run("create-user-in-db", async () => {
      try {
        // Check if user already exists
        const existingUserById = await User.findById(id);
        if (existingUserById) {
          console.log(`User already exists: ${id}`);
          return { success: true, userId: id, message: "User already exists" };
        }

        const userData = {
          _id: id,
          email: email_addresses[0].email_address,
          fullName: `${first_name || ''} ${last_name || ''}`.trim() || email_addresses[0].email_address.split("@")[0],
          avatar: {
            url: image_url || 'https://avatar.iran.liara.run/public',
          },
        };

        const newUser = await User.create(userData);
        console.log(`User created successfully: ${newUser._id}`);
        return { success: true, userId: newUser._id, message: "User created" };
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    });
  }
);

// Inngest Function to update user data in database
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event, step }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    return await step.run("update-user-in-db", async () => {
      try {
        const updatedUserData = {
          email: email_addresses[0].email_address,
          fullName: `${first_name || ''} ${last_name || ''}`.trim(),
        };

        // Only update avatar if image_url is provided
        if (image_url) {
          updatedUserData.avatar = { url: image_url };
        }

        const updatedUser = await User.findByIdAndUpdate(
          id, 
          updatedUserData,
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          console.warn(`User not found with id: ${id}. Creating new user.`);
          // If user doesn't exist, create it (fallback for webhook order issues)
          const newUser = await User.create({
            _id: id,
            email: email_addresses[0].email_address,
            fullName: `${first_name || ''} ${last_name || ''}`.trim() || email_addresses[0].email_address.split("@")[0],
            avatar: { url: image_url || 'https://avatar.iran.liara.run/public' },
          });
          return { success: true, userId: newUser._id, message: "User created during update" };
        }

        console.log(`User updated successfully: ${updatedUser._id}`);
        return { success: true, userId: updatedUser._id, message: "User updated" };
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    });
  }
);

// Inngest Function to delete user from database
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    const { id } = event.data;

    return await step.run("delete-user-from-db", async () => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
          console.warn(`User not found with id: ${id}. May have been already deleted.`);
          return { success: true, userId: id, message: "User not found (may be already deleted)" };
        }

        console.log(`User deleted successfully: ${id}`);
        return { success: true, userId: id, message: "User deleted" };
      } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
      }
    });
  }
);



export const functions = [syncUserCreation, syncUserUpdation, syncUserDeletion];