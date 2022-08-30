import * as yup from "yup";

const TaskValidationSchema = yup.object().shape({
  title: yup.string().trim().required("Task name required."),
  subtasks: yup
    .array()
    .min(1, "Requires min. 1 subtask")
    .of(
      yup.object().shape({
        task: yup.string().required("Can't be empty"),
      })
    )
    .required(),
});

export default TaskValidationSchema;
