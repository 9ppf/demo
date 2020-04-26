<template>
	<div class="uploading">
		<div class="header">
			<a href="javascript:history.go(-1)"><van-icon name="arrow-left" /></a>
			<div class="title">拍照并上传照片</div>
		</div>
		<div>
			<div class="title">上传身份证正</div>
			<!-- 上传图片 -->
			<div class="voucher">
				<!-- 正面 -->
				<div class="front">
					<div><img :src="imgsrc1" v-show="show1" /></div>
					<div class="camera-photo" ref="divGenres" v-show="isPhoto" @touchend="choiceImg1">
						<span>上传身份证正面</span>
						<input type="file" ref="foreheadCir" @change="onFileChange1" accept="image/*" class="input1" style="display: none;" mutiple="mutiple" capture="camera" />
					</div>
				</div>
				<!-- 反面 -->
				<div class="frontside">
					<div><img :src="imgsrc" v-show="show" /></div>
					<div class="camera-photo" ref="divGenres" v-show="isPhoto" @touchend="choiceImg">
						<span>上传身份证反面</span>
						<input type="file" ref="foreheadCir" @change="onFileChange" accept="image/*" class="input2" style="display: none;" mutiple="mutiple" capture="camera" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Assess',
	data() {
		return {
			type: 1,
			imgsrc1: '', //正面照片上传的·图片的地址
			show1: false, //反面图片放大预览
			isPhoto: true,
			uploadFile1: null,
			imgsrc: '', //反面面照片上传的·图片的地址
			show: false, //反面图片放大预览
			uploadFile: null
		};
	},
	computed: {},
	mounted() {},
	methods: {
		// 正面
		choiceImg1() {
			let self = this;
			if (!window.plus) {
				self.addPic(1); //如果不支持plus,就用本地相册上传即可
				return;
			}

			let title = '选择照片';
			let btns = ['拍照', '相册'];
			var func = function(e) {
				var index = e.index;
				if (index == 1) self.choiceCamera1();
				if (index == 2) self.choicePic1();
			};

			if (title && btns && btns.length > 0) {
				var btnArray = [];
				for (var i = 0; i < btns.length; i++) {
					btnArray.push({ title: btns[i] });
				}

				plus.nativeUI.actionSheet(
					{
						title: title,
						cancel: '取消',
						buttons: btnArray
					},
					function(e) {
						if (func) func(e);
					}
				);
			}
		},

		choiceCamera1() {
			let self = this;
			let camera = plus.camera.getCamera();
			camera.captureImage(
				function(filePath) {
					plus.io.resolveLocalFileSystemURL(
						filePath,
						function(entry) {
							entry.file(function(file) {
								let reader = null;
								reader = new plus.io.FileReader();
								reader.onload = function(e) {};
								reader.readAsDataURL(file);
								reader.onloadend = function(e) {
									let dataBase = e.target.result;
									self.show1 = true;
									self.imgsrc1 = e.target.result;
									// self.$api.uploadPicTo({ image: e.target.result }).then(res => {
									// 	self.show1 = true;
									// 	self.imgsrc1 = res.data.src;
									// });
								};
							});
						},
						function(e) {}
					);
				},
				function(e) {},
				{
					filename: '_doc/camera/',
					index: 1
				}
			);
		},

		choicePic1() {
			let self = this;
			plus.gallery.pick(function(filePath) {
				plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
					entry.file(function(file) {
						let reader = null;
						reader = new plus.io.FileReader();
						reader.onload = function(e) {};
						reader.readAsDataURL(file);
						reader.onloadend = function(e) {
							let dataBase = e.target.result;
							self.show1 = true;
							self.imgsrc1 = e.target.result;
							// self.$api.uploadPicTo({ image: e.target.result }).then(res => {
							// 	self.show1 = true;
							// 	self.imgsrc1 = res.data.src;
							// });
						};
					});
				});
			});
		},

		onFileChange1(e) {
			let self = this;
			let files = e.target.files || e.dataTransfer.files;
			if (!files.length) return;
			let file = files[0]; //File对象
			self.uploadFile1 = file;
			let reader = new FileReader(); //FileReader对象
			reader.readAsDataURL(file); //该方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，readyState 会变成已完成（DONE），并触发 loadend 事件，同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。
			reader.onload = function(e) {
				// self.$api.uploadPicTo({ image: e.target.result }).then(res => {
				// 	self.imgsrc1 = res.data.src;
				// });
				// self.imgsrc1 = e.target.result; //图片内容的base64编码
				self.show1 = true;
				self.imgsrc1 = e.target.result;
			};
		},

		// addPic1() {
		// 	var els = document.getElementsByClassName('input1')[0];
		// 	els.click();
		// 	return false;
		// },
		// 反面
		choiceImg() {
			let self = this;
			if (!window.plus) {
				self.addPic(2); //如果不支持plus,就用本地相册上传即可
				return;
			}

			let title = '选择照片';
			let btns = ['拍照', '相册'];
			var func = function(e) {
				var index = e.index;
				if (index == 1) self.choiceCamera();
				if (index == 2) self.choicePic();
			};

			if (title && btns && btns.length > 0) {
				var btnArray = [];
				for (var i = 0; i < btns.length; i++) {
					btnArray.push({ title: btns[i] });
				}

				plus.nativeUI.actionSheet(
					{
						title: title,
						cancel: '取消',
						buttons: btnArray
					},
					function(e) {
						if (func) func(e);
					}
				);
			}
		},

		choiceCamera() {
			let self = this;
			let camera = plus.camera.getCamera();
			camera.captureImage(
				function(filePath) {
					plus.io.resolveLocalFileSystemURL(
						filePath,
						function(entry) {
							entry.file(function(file) {
								let reader = null;
								reader = new plus.io.FileReader();
								reader.onload = function(e) {};
								reader.readAsDataURL(file);
								reader.onloadend = function(e) {
									let dataBase = e.target.result;
									self.show = true;
									self.imgsrc = e.target.result;
									// self.$api.uploadPicTo({ image: e.target.result }).then(res => {
									// 	self.show = true;
									// 	self.imgsrc = res.data.src;
									// });
								};
							});
						},
						function(e) {}
					);
				},
				function(e) {},
				{
					filename: '_doc/camera/',
					index: 1
				}
			);
		},

		choicePic() {
			let self = this;
			plus.gallery.pick(function(filePath) {
				plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
					entry.file(function(file) {
						let reader = null;
						reader = new plus.io.FileReader();
						reader.onload = function(e) {};
						reader.readAsDataURL(file);
						reader.onloadend = function(e) {
							let dataBase = e.target.result;
							self.show = true;
							self.imgsrc = e.target.result;
							// self.$api.uploadPicTo({ image: e.target.result }).then(res => {
							// 	self.show = true;
							// 	self.imgsrc = res.data.src;
							// });
						};
					});
				});
			});
		},

		onFileChange(e) {
			let self = this;
			let files = e.target.files || e.dataTransfer.files;
			if (!files.length) return;
			let file = files[0]; //File对象
			self.uploadFile = file;
			let reader = new FileReader(); //FileReader对象
			reader.readAsDataURL(file); //该方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，readyState 会变成已完成（DONE），并触发 loadend 事件，同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。
			reader.onload = function(e) {
				self.show = true;
				self.imgsrc = e.target.result;
				// self.$api.uploadPicTo({ image: e.target.result }).then(res => {
				// 	console.log(res);
				// 	self.imgsrc = res.data.src;
				// });
				// self.imgsrc = e.target.result; //图片内容的base64编码
			};
		},

		addPic(item) {
			if(item==2){
				var els = this.$refs.divGenres.querySelectorAll('.input2')[0];
			}else{
				var els = document.getElementsByClassName('input1')[0];
			}
			els.click();
			return false;
		}
	}
};
</script>

<style scoped>
.uploading {
	height: 100vh;
	overflow: hidden;
	overflow-y: scroll;
}
.uploading .voucher {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  margin-bottom: 20px;
  background-color: #ffffff;
  text-align: center;
  padding-bottom: 10px;
}
.uploading .voucher > div {
  width: 45%;
  margin: 0 2.5%;
}
.uploading .front > div:first-child {
  height: 75px;
  background: url(../assets/img/ic_commit_idcard_img_front.png);
  background-size: 100% 100%;
}
.uploading .frontside > div:first-child {
  height: 75px;
  background: url(../assets/img/ic_dialog_id_back.png);
  background-size: 100% 100%;
}

.uploading .front .camera-photo,
.uploading .frontside .camera-photo {
  width: 90%;
  height: 40px;
  line-height: 40px;
  background: #0000ff;
  margin: 20px auto;
  color: #ffffff;
  width: 95%;
  border-radius: 10px;
}

.uploading .voucher > div img {
  height: 100%;
  width: 100%;
}
</style>
