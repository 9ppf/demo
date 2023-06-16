<template>
	<view class='contents'>
		<view style='width:90%;min-height:600rpx;margin:0 auto;'>
			<view
				style='width:100%;text-align: center;font-size: 30rpx;font-weight: bold;height:100rpx;line-height: 100rpx;'>
				规则</view>
			<view style='font-size: 28rpx;line-height: 40rpx;text-indent:56rpx'>
				“立足新时代新征程，中国青年的奋斗目标和前行方向归结到一点，就是坚定不移听党话、跟党走，
				努力成长为堪当民族复兴重任的时代新人。”在五四青年节即将到来之际，
				习近平总书记来到中国人民大学考察调研，
				对全国广大青年提出殷切希望：“牢记党的教诲，立志民族复兴，不负韶华，不负时代，不负人民，
				在青春的赛道上奋力奔跑，争取跑出当代青年的最好成绩!”
			</view>
			<view
				style='text-align: center;font-size: 26rpx;width:200rpx;height:70rpx;line-height: 70rpx;background-color: #0599D7;color:#FFFFFF;border-radius: 40rpx;margin:0 auto;margin-top:20rpx;'
				@click='showSign'>{{signImage?'重新签名':'开始签名'}}</view>
			<view v-if='signImage' style='text-align: right;'>
				<image :src='signImage' style='width:200rpx;height:100rpx;'></image>
			</view>
		</view>

		<myPopup ref="pop">
			<view style='background-color: #FFFFFF;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;'>
				<view
					style='margin-left:92%;margin-bottom:10rpx;width:40rpx;height:40rpx;font-size: 26rpx;line-height: 40rpx;background-color: #000000;opacity: 0.5;border-radius: 20rpx;text-align: center;position:fixed;bottom:34.5%;z-index:3000;left:0rpx;color:#FFFFFF'
					@click='hideShow'>X</view>
				<view
					style='width:100%;height:100rpx;line-height: 100rpx;font-size: 30rpx;font-weight: bold;text-align: center;'>
					开始签名</view>
				<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)'
					@touchend='end' @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
				</canvas>

				<view class="caozuo">
					<view class="chongqian" @tap='clearClick'>
						重签
					</view>
					<view class="over" @click="overSign">
						完成签名
					</view>
				</view>
			</view>
		</myPopup>
		<view class='caozuo1'></view>
	</view>
</template>

<script>
	var content = null;
	var touchs = [];
	var canvasw = 0;
	var canvash = 0;
	var _that;
	//获取系统信息
	uni.getSystemInfo({
		success: function(res) {
			canvasw = res.windowWidth;
			canvash = res.windowHeight;
		},
	})
	import myPopup from '@/components/qianxiao-pop/qianxiao-pop.vue'
	export default {
		components: {
			myPopup
		},
		data() {
			return {
				signImage: '',
				isEnd: false // 是否签名
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			_that = this
			//获得Canvas的上下文
			content = uni.createCanvasContext('firstCanvas', _that)

		},

		methods: {
			hideShow() {
				console.log('333')
				// #ifdef MP-WEIXIN
				_that.$refs.pop.hide();
				// #endif
				// #ifdef APP-PLUS || H5
				_that.$nextTick(() => {
					_that.$refs.pop.hide();
				})
				// #endif
			},
			showSign() {
				// #ifdef MP-WEIXIN
				_that.$refs.pop.show();
				// #endif
				// #ifdef APP-PLUS || H5
				_that.$nextTick(() => {
					_that.$refs.pop.show();
				})
				// #endif

			},
			overSign: function() {
				if (_that.isEnd) {
					uni.canvasToTempFilePath({
						canvasId: 'firstCanvas',
						success: function(res) {
							//打印图片路径
							console.log(res.tempFilePath)
							console.log('完成签名')
							//设置图片
							_that.signImage = res.tempFilePath;


						}
					})
					_that.hideShow()
					_that.clearClick()
				} else {
					uni.showToast({
						title: '请先完成签名',
						icon: "none",
						duration: 1500,
						mask: true
					})
				}

			},

			// 画布的触摸移动开始手势响应
			start: function(event) {
				// console.log(event)
				// console.log("触摸开始" + event.changedTouches[0].x)
				// console.log("触摸开始" + event.changedTouches[0].y)
				//获取触摸开始的 x,y
				let point = {
					x: event.changedTouches[0].x,
					y: event.changedTouches[0].y
				}
				// console.log(point)
				touchs.push(point);

			},
			// 画布的触摸移动手势响应
			move: function(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				// console.log(point)
				touchs.push(point)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},

			// 画布的触摸移动结束手势响应
			end: function(e) {
				// 设置为已经签名
				this.isEnd = true;
				console.log('end')
				// 清空轨迹数组
				touchs.pop()
				// for (let i = 0; i < touchs.length; i++) {
				// 	touchs.pop()
				// }

			},

			// 画布的触摸取消响应
			cancel: function(e) {},

			// 画布的长按手势响应
			tap: function(e) {},
			//画布触摸错误
			error: function(e) {},

			//绘制
			draw: function(touchs) {
				let point1 = touchs[0]
				let point2 = touchs[1]
				touchs.shift()
				//设置线的颜色
				content.setStrokeStyle("#000")
				//设置线的宽度
				content.setLineWidth(5)
				//设置线两端端点样式更加圆润
				content.setLineCap('round')
				//设置两条线连接处更加圆润
				content.setLineJoin('round')
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true)
			},
			//清除操作
			clearClick: function() {
				// 设置为未签名
				this.isEnd = false
				//清除画布
				content.clearRect(0, 0, canvasw, canvash)
				content.draw(true)
			},
		},




	}
</script>

<style>
	.ts {
		color: #FF485D;
		font-size: 30upx;
		height: 100upx;
		line-height: 100upx;
		padding-left: 20upx;
	}

	canvas {
		background-color: #f2f2f2;
		width: 100%;
		height: 20vh;
		/* margin: 0 25upx; */
		/* height: calc(100vh - 140upx); */
	}

	.contents {
		padding-top: 20upx;
		padding-bottom: 100upx;
		box-sizing: border-box;
	}

	#signatureImg {
		background-color: #EEEEEE;
	}

	.caozuo1 {
		display: flex;
		height: 0;
		height: constant(safe-area-inset-bottom);
		height: env(safe-area-inset-bottom);
		width: 750upx;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #0599D7;

	}

	.caozuo {
		display: flex;
		height: 100rpx;
		width: 100%;
		margin-top: 20rpx;
		font-size: 28rpx;

	}

	.caozuo view {
		width: 40%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
		margin-left: 5%;
		border-radius: 40rpx;
	}

	.caozuo view:last-child {
		width: 40%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
		margin-left: 10%;
	}

	.caozuo view:active {
		background-color: #CCCCCC;
		color: #333333;
	}

	.chongqian {
		background-color: #FF8F58;
	}

	.over {
		background-color: #0599D7;
	}
</style>
