import React, { useState, useEffect, useMemo } from 'react';
import "../../components/css/CustomerPage.css";
import ReactQuill from 'react-quill';

const Inquiry = () => {
  // 사용자가 작성한 문의사항 목록을 관리할 상태
  const [inquiries, setInquiries] = useState([]);
  // 새로운 문의사항을 작성하기 위한 상태
  const [newInquiry, setNewInquiry] = useState("");

  const [title,setTitle] = useState("");


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



  // 문의사항을 서버에 제출하는 함수
  const submitInquiry = async () => {
    try {
      const response = await fetch("/api/qna/insertInquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           title:title,
           userCode: window.localStorage.getItem("userCode"),
           text: newInquiry 
          }),
      }).then(response => response.json())
      .then(alert("등록 완료")).then(setTitle(""),setInquiries(""))
      
    } catch (error) {
      alert("에러 발생")
    }
  };

  return (
    <div className="inquiry">
      <p className='title'>제목</p>
        <input className='admintitle' type='text' onChange={e => setTitle(e.target.value)} />
      <p>1:1 문의</p>
      <div className="inquiryForm">
        <ReactQuill
          className='inquiryText'
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={setNewInquiry}
        />
        <button className='inquiryButton' onClick={submitInquiry}>작성하기</button>
      </div>
    </div>
  );
};
export default Inquiry;