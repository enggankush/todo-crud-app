import { Box, Button, TextField, Checkbox } from "@mui/material";
import AuthCard from "../../components/card/AuthCard";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";

const ToDoPage = () => {
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState([]);
    const [editValue, setEditValue] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});

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

    const handleCheck = (index) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleEdit = (index) => {
        setInputValue(value[index]);
        setEditValue(index);
    };

    const handleDelete = (index) => {
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
                        <Box
                            key={index}
                            component="li"
                            sx={todo_list}
                        >
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                flex: 1,
                                minWidth: 0
                            }}>
                                <Checkbox
                                    checked={checkedItems[index] || false}
                                    onChange={() => handleCheck(index)}
                                    sx={{ padding: 0, marginRight: "10px", color: "#fff" }}
                                />
                                <span
                                    style={span_item(index, checkedItems)}
                                >
                                    {CurrentValue}
                                </span>
                            </Box>
                            <Box>
                                <Button onClick={() => handleEdit(index)} type="button">
                                    <EditOutlinedIcon sx={{ color: "#00b0ff" }} />
                                </Button>
                                <Button onClick={() => handleDelete(index)} type="button">
                                    <DeleteOutlineOutlinedIcon sx={{ color: "#ff5252" }} />
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
    // justifyContent: "space-between", // ✅ icons push to right
    listStyle: "none", // remove default li dot
    marginBottom: "8px",
    backgroundColor: "#2c2c2c",
    borderRadius: "6px",
    padding: "4px 0px 4px 0px"
};

const span_item = (index, checkedItems) => ({
    textDecoration: checkedItems[index] ? "line-through" : "none",
    color: "#fff",
    fontSize: "20px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap", // ✅ text responsive
    flex: 1,
})
