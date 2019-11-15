const multer = require("multer")//添加外部模块的引用

function createUp(direct_path) {
    let storage = multer.diskStorage({
        destination: function (req, file, cb){
            //此处为设置文件路径
            cb(null, direct_path)//存储到服务器上文件地址，可以自己定义路径
        },
        filename: function (req, file, cb){
            //通过一系列处理 获取原图片的后缀名
            let fileList = file.originalname.split(".");
            let ext = fileList[fileList.length-1];

            //以时间戳为文件名可保证文件名不会重复
            let times = new Date();    //文件名，此处采用时间戳的形式，有些可以采用hash值的形式。自行定义
            times = times.getTime();

            //通过时间戳和原文件的后缀来生成新的文件名
            let newName = `${times}.${ext}`;
            cb(null, newName)
        }
    });
    return multer({storage});
}

const teacher_up = createUp('./public/assets/images/teacher_avatars');
const course_up = createUp('./public/assets/images/course_images');

module.exports = {
    teacher_up,
    course_up
};
