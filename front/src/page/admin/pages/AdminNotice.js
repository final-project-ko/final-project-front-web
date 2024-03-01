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

	return(
    <div className='adminNotice'>
      <div className='adminNoticeTitle'>
        <p>본문 내용</p>
      </div>
      <ReactQuill
        className='adminNoticeText'
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={setValues}
      />
    </div>
    )
}

export default AdminNotice;