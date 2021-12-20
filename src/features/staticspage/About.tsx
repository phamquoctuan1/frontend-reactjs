import React from 'react'

import imgAbout from './img/about1.jpg'
const About = () => {
    return (
      <div className='about_section'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 col-md-12'>
              <div className='about_content'>
                <h1>Chào mừng đến với YoLo Shop!</h1>
                <p>
                  Với tầm nhìn chiến lược trở thành thương thiệu “Thời trang
                  được yêu thích nhất Việt Nam”, từ những ngày đầu bước vào thị
                  trường, Yolo đã rất được chú trọng việc nghiên cứu, phát triển
                  mẫu mã, phom dáng phủ hợp với hình thể đàn ông Việt. Nguồn
                  nguyên liệu được kiểm soát chặt chẽ, máy móc và trang thiết bị
                  hiện đại là đòn bẩy cho sự phát triển bền vững của thương
                  hiệu. Đối tượng mà Yolo hướng tới là nam giới trong độ tuổi từ
                  25 đến 35 tuổi, những người đàn ông thành đạt , luôn muốn có
                  sự cân bằng giữa phát triển sự nghiệp và tận hưởng cuộc sống.
                  Sản phẩm của Biluxury mang tới cho phái mạnh Việt hình ảnh trẻ
                  trung, năng động, hiện đại mà không kém phần lịch sự, sang
                  trọng. Được hàng trăm nghìn khách hàng thân thiết đặt niểm tin
                  và lựa chọn là người bạn đồng hành mỗi ngày trong công việc và
                  cuộc sống.
                </p>
                <p>
                  SỨ MỆNH Không ngừng sáng tạo và tỉ mỉ từ công đoạn sản xuất
                  đến các khâu dịch vụ, nhằm mang đến cho Quý Khách Hàng những
                  trải nghiệm mua sắm đặc biệt nhất: sản phẩm chất lượng - dịch
                  vụ hoàn hảo - xu hướng thời trang mới mẻ và tinh tế. Thông qua
                  các sản phẩm thời trang, Yolo luôn mong muốn truyền tải đến
                  bạn những thông điệp tốt đẹp cùng với nguồn cảm hứng trẻ trung
                  và tích cực.
                </p>
                <p>
                  <b>Với khách hàng:</b> Yolo luôn quan tâm đến lợi ích của
                  khách hàng và không ngừng mở rộng hệ thống phân phối để đáp
                  ứng tốt nhất nhu cầu của khách hàng: nhanh nhất, tiện lợi
                  nhất, chất lượng tốt nhất, giá rẻ nhất.
                </p>
              </div>
            </div>
            <div className='col-lg-6 col-md-12'>
              <div className='about_thumb'>
                <img src={imgAbout} alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default About
