import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import {z} from "zod"

const schema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.email("Correo invalido").min(1,"El correo es obligatorio"),
    password: z.string().min(6,"La contraseña debe de tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "La confirmacion debe tener al menos 6 caracteres")
}).refine(data => data.password === data.confirmPassword, {
    message: "las contraseñas deben coincidir",
    path: ['confirmPassword']
})

type formValues = z.Infer<typeof schema>

export function CustomForm(){

    const {control, handleSubmit, formState: { errors } } = useForm<formValues>({
        resolver: zodResolver(schema)
    })

    const onSubmit: SubmitHandler<formValues> = (data) => {
        console.log(data)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <Controller 
                    name="name" 
                    control={control} 
                    render={ ({ field }) => <input id="name" type="string" {...field} className={`form-control ${errors.name ? "is-invalid" : ""}`} /> }
                />
            </div>
        </form>
    )
}