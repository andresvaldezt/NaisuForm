import {z} from "zod"

export const schema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().min(1,"El correo es obligatorio").email("Correo invalido"),
    password: z.string().min(6,"La contraseña debe de tener al menos 6 caracteres")
        .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/, "Debe tener al menos una mayúscula, un número y un carácter especial"),
    confirmPassword: z.string().min(6, "La confirmacion debe tener al menos 6 caracteres")
}).refine(data => data.password === data.confirmPassword, {
    message: "las contraseñas deben coincidir",
    path: ['confirmPassword']
})

export type FormValues = z.infer<typeof schema>