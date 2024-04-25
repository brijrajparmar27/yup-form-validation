import { useState } from "react";
import "./App.css";
import * as Yup from "yup";

function App() {
  const [errors, setErros] = useState({});
  const userSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().min(5).max(50).required(),
    phone: Yup.string().required().min(8).max(15),
    password: Yup.string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      phone: e.target.phone.value.trim(),
      password: e.target.password.value.trim(),
    };
    try {
      await userSchema.validate(formData, { abortEarly: false });
      console.log("sucess");
    } catch (errors) {
      let formulateerrors = {};
      errors.inner.forEach((each) => {
        formulateerrors[each.path] = each.message;
      });
      setErros(formulateerrors);
      console.log(formulateerrors);
    }
  };
  return (
    <div>
      <h1>Yup</h1>
      <form onSubmit={handleSubmit}>
        <p>name</p>
        <input type="text" name="name" />
        {errors.name && <p className="error">{errors.name}</p>}
        <p>email</p>
        <input type="text" name="email" />
        {errors.email && <p className="error">{errors.email}</p>}
        <p>Phonenumber</p>
        <input type="text" name="phone" />
        {errors.phone && <p className="error">{errors.phone}</p>}
        <p>password</p>
        <input type="text" name="password" />
        {errors.password && <p className="error">{errors.password}</p>}
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
