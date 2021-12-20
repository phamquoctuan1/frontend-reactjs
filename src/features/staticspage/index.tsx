import React from 'react'
import './staticsfile.css'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from 'react-router-dom';

const ContactPage = () => {
    const history = useHistory();
     const MySwal = withReactContent(Swal);
    const handleSubmit = (event :any) => {
      event.preventDefault();
    MySwal.fire(
   'Thành công',
   'Bạn sẽ nhận được phản hồi sớm từ chúng tôi xin cảm ơn',
   'success'
         ).then(() => {
             history.push('/');
         });
    };
    return (
     <div className="contact_area">
        <div className="container">   
            <div className="row">
                <div className="col-lg-6 col-md-12">
                   <div className="contact_message content">
                        <h3>Liên hệ với chúng tôi</h3>    
                         <p>Xin cảm ơn bạn đã tin tưởng và đặt niềm tin vào cửa hàng của chúng tôi, mong bạn có một ngày thật tốt đẹp và nhiều may mắn thỏa sức mua sắm, mọi chi tiết thắc mắc xin liên hệ với chúng tôi qua form dưới đây!</p>
                                    
                    </div> 
                </div>
                <div className="col-lg-6 col-md-12">
                   <div className="contact_message form">
                        <h3>Thắc mắc xin liên hệ</h3>   
                        <form onSubmit={handleSubmit}>
                            <p>  
                               <label> Tên của bạn </label>
                                <input name="name"  type="text"/> 
                            </p>
                            <p>       
                               <label>  Địa chỉ email</label>
                                <input name="email" type="email"/>
                            </p>
                            <p>          
                               <label>  Tiêu đề</label>
                                <input name="subject"  type="text"/>
                            </p>    
                            <div className="contact_textarea">
                                <label>  Nội dung</label>
                                <textarea  name="message"  className="form-control2" ></textarea>     
                            </div>   
                            <button type="submit"> Gửi</button>  
                            <p className="form-messege"></p>
                        </form> 

                    </div> 
                </div>
            </div>
        </div>    
    </div>
       
    )
}

export default ContactPage;
