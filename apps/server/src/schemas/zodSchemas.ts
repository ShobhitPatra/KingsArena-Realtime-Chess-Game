import z from "zod"

const signupSchema = z.object({
    name :z.string().min(1,{message :"name field cannot be empty"})
})