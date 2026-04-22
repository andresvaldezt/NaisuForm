import { type Control, type FieldError, Controller } from "react-hook-form"
import { useState } from "react";
import './CustomInput.css'
import { type FormValues } from "./models/form.model";

interface Props {
    name: keyof FormValues,
    control: Control<FormValues>,
    label: string,
    type?: string,
    error?: FieldError
}

export default function InputForm({ name, control, label, type = "text", error }: Props){
     // Estado para controlar la visibilidad
    const [showPassword, setShowPassword] = useState(false);

    // Determinar el tipo real del input
    const isPasswordField = type === "password";
    const inputType = isPasswordField && showPassword ? "text" : type;

    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="input-group" style={{ position: 'relative' }}>
                <Controller 
                    name={name} 
                    control={control} 
                    render={ ({ field }) => 
                        <input id={name} autoComplete={name} type={inputType} {...field} className={`form-control ${error ? "is-invalid" : ""}`} aria-invalid={error ? "true" : "false"} /> 
                    }
                />
                {/* Botón de "ver" solo si el tipo original es password */}
                {isPasswordField && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            left: '160px',
                            top: '20%',
                            border: 'none',
                            background: 'none',
                            zIndex: 10,
                            cursor: 'pointer'
                        }}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                )}
            </div>
            {error && <p className="invalid-feedback">{error.message}</p>}
        </div>
    )
}