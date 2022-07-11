import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { createNote } from "../../redux/dataLocalSlice";

export default function EditorMain() {
    const [title, setTitle] = useState("");
    const editorRef = useRef(null);
    const titleRef = useRef();
    const dispatch = useDispatch();

    const notify = (isState) => {
        if (isState) {
            toast.success("Create successful note 🎉", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error("Failed to create note! 💔", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    const saveData = () => {
        if (title && editorRef.current?.getContent()) {
            const dataLocal = {
                id: uuidv4(),
                title: title,
                content: editorRef.current.getContent(),
            };
            dispatch(createNote(dataLocal));
            notify(true);
            setTitle("");
            titleRef.current.focus();
        } else {
            notify(false);
            titleRef.current.focus();
        }
    };
    return (
        <div className="container ">
            <ToastContainer />
            <div className=" mb-2">
                <input
                    type="text"
                    className=" border border-gray-300 outline-gray-200 text-sm rounded-lg block w-full p-2.5 "
                    placeholder="Enter a note title... "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    ref={titleRef}
                />
            </div>
            <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                apiKey="el9eht3oqsjlpvjkdu2mx5gh01fq5xie6zt09pq791iqfhej"
                init={{
                    height: 500,
                    menubar: false,
                    selector: "textarea",
                    plugins: [
                        "advlist  autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
            />
            <button
                onClick={saveData}
                className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl mt-2 container"
            >
                Save to NoteList
            </button>
        </div>
    );
}
