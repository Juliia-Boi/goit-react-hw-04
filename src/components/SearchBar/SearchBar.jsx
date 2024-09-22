import { Formik, Field, Form } from "formik";
import { toast } from "react-hot-toast";
import { TbDeviceDesktopSearch } from "react-icons/tb";
import css from "../SearchBar/SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <header className={css.header}>
      <Formik
        initialValues={{ topic: "" }}
        onSubmit={(values, actions) => {
          if (values.topic.trim() === "") {
            toast.error("Please enter a search query!");
          } else {
            onSearch(values.topic);
            actions.resetForm();
          }
        }}
      >
        {() => (
          <Form className={css.form}>
            <Field
              autoComplete="off"
              autoFocus
              type="text"
              name="topic"
              className={css.field}
              placeholder="Search images and photos"
            />
            <button type="submit" className={css.iconButton}>
              <TbDeviceDesktopSearch size="28" />
            </button>
          </Form>
        )}
      </Formik>
    </header>
  );
}
