# NaisuForm 📝

**NaisuForm** is a high-quality, type-safe React form implementation. It demonstrates best practices for form management using **React Hook Form**, schema validation with **Zod**, and robust component architecting with **TypeScript**.

## 🚀 Key Features

-   **Type Safety**: Full integration with TypeScript, ensuring that form fields and validation schemas stay in sync.
-   **Schema Validation**: Powered by Zod, featuring complex rules such as:
    -   Required field checks.
    -   Email format validation.
    -   Strong password requirements (Uppercase, Number, and Special Character via Regex).
    -   Cross-field validation (Password confirmation matching).
-   **Reusable Components**: A modular `InputForm` component that handles error states and accessibility automatically.
-   **Dynamic Password Visibility**: Built-in toggle to mask/unmask sensitive fields.
-   **Controlled Implementation**: Uses React Hook Form's `Controller` for seamless integration with custom inputs.

## 🛠️ Tech Stack

-   **React** (Functional Components & Hooks)
-   **TypeScript**
-   **React Hook Form** (Form state management)
-   **Zod** (Schema declaration and validation)
-   **@hookform/resolvers** (Zod-HookForm bridge)

## 📂 Project Structure

The project is organized to separate validation rules from UI components, making it easy to maintain and scale:

```text
src/
├── components/
│   ├── CustomForm/
│   │   └── CustomForm.tsx    # Main form logic and submission handling
│   ├── models/
│   │   └── form.model.ts     # Zod schema and FormValues type (Source of Truth)
│   ├── CustomInput.tsx       # Reusable Input component with visibility toggle
│   └── CustomInput.css       # Styles for inputs, error states, and toggle button
├── App.tsx                   # Main entry point
├── App.css                   # Global layout styles
└── main.tsx                  # React DOM initialization
```

### Key Highlights:
- **`models/form.model.ts`**: Contains the Zod validation schema. By exporting `z.infer<typeof schema>`, we ensure the UI always matches the validation rules.
- **`CustomInput.tsx`**: A decoupled component that uses React Hook Form's `Controller`. It handles its own internal state for password visibility while staying synced with the parent form.

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/andresvaldezt/NaisuForm.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Architecture Highlights

### Advanced Validation Schema
The validation logic is decoupled from the UI, making it easy to test and maintain:
```typescript
export const schema = z.object({
    password: z.string()
        .min(6)
        .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "Strong password required"),
    // ...
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ['confirmPassword']
});
```

### Generic Input Component
The `InputForm` component is designed to be reusable across different forms by leveraging TypeScript's `keyof` and `Control` types to prevent runtime errors.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
