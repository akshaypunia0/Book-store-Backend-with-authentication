import fs from 'fs/promises'
import path from 'path'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'

dotenv.config()

const jwtToken = process.env.JWT_TOKEN

const usersFile = path.resolve('../data/users.json')


const readUsers = async () => {
    const data = await fs.readFile(usersFile, 'utf-8')
}

const writeUsers = async (users) => {
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2))
}



const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({message: 'All fields are required'})
    }

    const users = readUsers(readUsers);

    const existingUser = users.find((user) => user.email === email)

    if(existingUser) {
        return res.status(400).json({message: 'user already exist'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
        id: uuidv4,
        name,
        email,
        password: hashedPassword
    };

    users.push(newUser)
    await writeUsers(users)

    return res.status(201).json({message: 'User successfully registered'})
 
    } catch (error) {
        res.status(500).json({message: 'something went wrong', error: error.mesage})
    }



    const loginUser = async (req, res) => {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return res.status(400).json({message: 'Both email and password are required'})
            }

            const users = await readUsers()

            const user = users.find((user) => user.email === email)

            if (!user) {
                return res.status(401).json({message: 'Invalid credentials'})
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password)

            if (!isPasswordMatch) {
                return res.status(401).json({mesage: 'Invalid credentials'})
            }

            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email
                },
                jwtToken,
                {
                    expiresIn: '1h'
                }

            )

            return res.status(201).json(token)


        } catch (error) {
            return res.status(500).json({message: 'something went wrong', error: error.mesage})
        }
    }
       
}

export { registerUser, loginUser }