import { Box, Button, TextField, Checkbox } from "@mui/material";
import { EditOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import AuthCard from "../../components/card/AuthCard";
import { useState, type ChangeEvent, type FormEvent } from "react";

const ToDoPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [value, setValue] = useState<string[]>([]);
  const [editValue, setEditValue] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editValue !== null) {
      const newValue = [...value];
      newValue[editValue] = inputValue;
      setValue(newValue);
      setEditValue(null);
    } else {
      setValue([...value, inputValue]);
    }
    setInputValue("");
  };

  const handleCheck = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleEdit = (index: number) => {
    setInputValue(value[index]);
    setEditValue(index);
  };

  const handleDelete = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    setValue(newValue);
    setCheckedItems((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  return (
    <Box sx={todo_header}>
      <AuthCard title="My To-do List">
        <form onSubmit={handleSubmit}>
          <TextField
            sx={todo_input}
            type="text"
            required
            autoFocus
            placeholder="My Task"
            value={inputValue}
            onChange={handleChange}
          />
          <Button sx={todo_button} type="submit">
            {editValue !== null ? "Update Item" : "Add Item"}
          </Button>
        </form>

        <ol style={{ paddingLeft: 0 }}>
          {value.map((CurrentValue, index) => (
            <Box key={index} component="li" sx={todo_list}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Checkbox
                  checked={checkedItems[index] || false}
                  onChange={() => handleCheck(index)}
                  sx={{
                    padding: 0,
                    marginRight: "10px",
                    color: "#fff",
                  }}
                />
                <span style={span_item(index, checkedItems)}>
                  {CurrentValue}
                </span>
              </Box>
              <Box>
                <Button onClick={() => handleEdit(index)} type="button">
                  <EditOutlined sx={{ color: "#00b0ff" }} />
                </Button>
                <Button onClick={() => handleDelete(index)} type="button">
                  <DeleteOutlineOutlined sx={{ color: "#ff5252" }} />
                </Button>
              </Box>
            </Box>
          ))}
        </ol>
      </AuthCard>
    </Box>
  );
};

export default ToDoPage;

const todo_header = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 4,
};

const todo_input = {
  backgroundColor: "#fff",
  borderRadius: 2,
  width: "400px",
  marginTop: "30px",
  marginBottom: "20px",
  input: {
    "&::placeholder": {
      fontWeight: "bold",
      color: "#0c0c0cff",
    },
  },
};

const todo_button = {
  marginY: 4,
  backgroundColor: "#880af2",
  textTransform: "none",
  borderRadius: 2,
  fontWeight: "bold",
  fontSize: "larger",
  px: 8,
  color: "#fff",
};

const todo_list = {
  display: "flex",
  alignItems: "center",
  listStyle: "none",
  marginBottom: "8px",
  backgroundColor: "#2c2c2c",
  borderRadius: "6px",
  padding: "4px 0px 4px 0px",
};

// ✅ span_item typed
const span_item = (
  index: number,
  checkedItems: Record<number, boolean>
): React.CSSProperties => ({
  textDecoration: checkedItems[index] ? "line-through" : "none",
  color: "#fff",
  fontSize: "20px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  flex: 1,
});
