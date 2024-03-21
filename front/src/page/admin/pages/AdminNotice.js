import React, {
  ReactChild,
  ReactFragment,
  RefObject,
  useMemo,
  useState,
} from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../../../components/css/admin/AdminNotice.css";


const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'color',
  'background',
  'size',
  'h1',
];

const AdminNotice = () => {

  const [values, setValues] = useState();
  const [title, setTitle] = useState("");


  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [
            {
              color: [],
            },
            { background: [] },
          ],
        ],
      },
    };
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  }
  const insertHandler = async () => {
    await fetch("https://www.oheveryday.shop/api/notice/insertNotice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        values: values,
      }),
    }).then(res => {
      if (res.ok) {
        alert("등록 완료");
        setTitle("");
        setValues("");

      } else {
        alert("오류 발생 다시 시도 해 주세요");
      }
    })

  }



  return (
    <div className='adminNotice'>

        <p className='title'>제목</p>
        <input className='admintitle' type='text' onChange={handleTitleChange} />


        <ReactQuill
          className='adminNoticeText'
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={setValues}
        />

      <button className='adminInsert' onClick={insertHandler}>등록</button>
    </div>
  )
}

export default AdminNotice;