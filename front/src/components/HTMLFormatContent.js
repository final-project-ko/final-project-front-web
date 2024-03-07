
const HTMLFormattedContent = ({ htmlContent }) => {
  return (
   <div dangerouslySetInnerHTML={{ __html: htmlContent }}/>
 

  );
};

export default HTMLFormattedContent;