import { useState, useRef } from "react";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import { deleteNote, editNote } from "../../redux/dataLocalSlice";
import { useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

export default function Note(props) {
    const { title, content, id } = props;
    const [showNote, setShowNote] = useState(false);
    const [isDeleteNote, setIsDeleteNote] = useState(false);
    const [isEditNote, setIsEditNote] = useState(false);
    const [editTitle, setEditTitle] = useState(title);

    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const notifyDelete = () =>
        toast.success("Delete Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    const notifyEdit = (isState) => {
        if (isState) {
            toast.success("Edit successful note 🎉", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error("Failed to edit note! 💔", {
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
    function handleDeleteNote(id) {
        dispatch(deleteNote(id));
        notifyDelete();
    }
    const saveData = (id) => {
        if (editTitle && editorRef.current?.getContent()) {
            const dataLocal = {
                id: id,
                title: editTitle,
                content: editorRef.current.getContent(),
            };
            dispatch(editNote(dataLocal));
            notifyEdit(true);
            setIsEditNote(false);
        } else {
            notifyEdit(false);
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="note my-3">
                <h2 id="accordion-color-heading-2">
                    <button
                        type="button"
                        className="flex justify-between items-center  p-4 w-full font-medium text-left text-gray-500 border rounded-xl border-gray-300 focus:ring-4 focus:ring-blue-100  dark:text-gray-400 hover:bg-blue-50 "
                        data-accordion-target="#accordion-color-body-2"
                        aria-expanded="false"
                        aria-controls="accordion-color-body-2"
                        onClick={() => setShowNote(!showNote)}
                    >
                        <span>{title}</span>
                        <svg
                            data-accordion-icon
                            className={
                                showNote
                                    ? "w-6 h-6 shrink-0 origin-center rotate-180"
                                    : "w-6 h-6 shrink-0"
                            }
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </h2>
                <div
                    id="accordion-color-body-2"
                    className={showNote ? "showNote" : "hidden"}
                    aria-labelledby="accordion-color-heading-2"
                >
                    <div className="px-5 pt-3 border border-gray-200 rounded-lg mt-2">
                        <p className="mb-2 text-black">{parse(content)}</p>
                        <div className="flex justify-end">
                            <div
                                className="btn-action p-1 text-yellow-500 text-2xl cursor-pointer"
                                onClick={() => setIsEditNote(!isEditNote)}
                            >
                                <ion-icon name="create-sharp"></ion-icon>
                            </div>
                            <div
                                className="btn-action p-1 text-red-500 text-2xl cursor-pointer"
                                onClick={() => setIsDeleteNote(!isDeleteNote)}
                            >
                                <ion-icon name="trash-sharp"></ion-icon>
                            </div>
                        </div>
                    </div>
                </div>
                {/* delete */}
                <div
                    onClick={() => setIsDeleteNote(!isDeleteNote)}
                    class={`${
                        isDeleteNote ? "activeShow" : "hidden"
                    } overflow-y-auto overflow-x-hidden fixed top-0 right-0 flex justify-center items-center  dark:bg-slate-100 left-0 z-50 md:inset-0 h-modal md:h-full `}
                >
                    <div class=" p-4 w-full max-w-md h-full md:h-auto ">
                        <div class=" bg-white rounded-lg shadow shadow-slate-400">
                            <button
                                type="button"
                                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                onClick={() => setIsDeleteNote(!isDeleteNote)}
                            >
                                <svg
                                    class="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <div class="p-6 text-center ">
                                <svg
                                    class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        strokeLinejoin="round"
                                        stroke-width="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                                <h3 class="mb-5 text-lg font-normal text-black">
                                    Are you sure you want to delete this note?
                                </h3>
                                <p className="mb-5 font-semibold text-2xl">{title}</p>
                                <button
                                    onClick={() => handleDeleteNote(id)}
                                    type="button"
                                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                >
                                    Yes, I'm sure
                                </button>
                                <button
                                    onClick={() =>
                                        setIsDeleteNote(!isDeleteNote)
                                    }
                                    type="button"
                                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* delete */}
                {/* edit */}
                <div
                    className={` ${
                        isEditNote ? "activeShow" : "hidden"
                    }   overflow-y-auto overflow-x-hidden fixed top-0 right-0 flex justify-center items-center text-black dark:bg-slate-100 left-0 z-50 md:inset-0 h-modal md:h-full`}
                >
                    <div className=" p-4 w-full max-w-[800px]  h-full md:h-auto ">
                        <div className=" relative bg-white rounded-lg shadow shadow-slate-400">
                            <button
                                type="button"
                                onClick={() => setIsEditNote(!isEditNote)}
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <div className="py-6 px-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 ">
                                    Edit Your Note 👀
                                </h3>

                                <div className="mb-5">
                                    <input
                                        type="text"
                                        className=" border border-gray-300 outline-gray-200 text-sm rounded-lg block w-full p-2.5 "
                                        placeholder="Enter a note title... "
                                        required
                                        value={editTitle}
                                        onChange={(e) =>
                                            setEditTitle(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-5">
                                    <Editor
                                        onInit={(evt, editor) =>
                                            (editorRef.current = editor)
                                        }
                                        initialValue={content}
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
                                </div>
                                <button
                                    onClick={() => saveData(id)}
                                    type="submit"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* edit */}
            </div>
        </>
    );
}
