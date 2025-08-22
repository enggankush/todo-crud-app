import { Box, Button, TextField } from "@mui/material";
import AuthCard from "../../components/card/AuthCard";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from "react";

const ToDoPage = () => {
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState([]);
    const [editValue, setEditValue] = useState(null);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
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

    const handleEdit = (index) => {
        setInputValue(value[index]);
        setEditValue(index);
    };

    const handleDelete = (index) => {
        const newValue = [...value];
        newValue.splice(index, 1);
        setValue(newValue);
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

                <ol>
                    {value.map((CurrentValue, index) => (
                        <Box key={index}>
                            <li>
                                {CurrentValue}
                                <Button onClick={() => handleEdit(index)} type="submit">
                                    <EditOutlinedIcon />
                                </Button>
                                <Button onClick={() => handleDelete(index)} type="submit">
                                    <DeleteOutlineOutlinedIcon />
                                </Button>
                            </li>
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
    paddingTop: 4
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
