import bcrypt from "bcryptjs";

//1.Hash password

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    return hasedPassword
}

export const isPasswordMatch = async (enteredPassword , password) => {
    return await bcrypt.compare(enteredPassword, password);
}