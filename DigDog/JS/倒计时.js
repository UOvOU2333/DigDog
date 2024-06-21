		
        // 检查浏览器是否支持Web Speech API
        if ('speechSynthesis' in window) {
            var synth = window.speechSynthesis;
            var utterance = new SpeechSynthesisUtterance('欢迎使用！语音功能已成功加载！');
            synth.speak(utterance);
        } else {
            alert("很抱歉，您的浏览器不支持语音合成功能。");
        }
	
	
	
	
        // 倒计时功能

        class Countdown {

			constructor(name, hours, minutes, seconds) {
				this.name = name;
				this.endTime = new Date();
				this.endTime.setHours(this.endTime.getHours() + hours);
				this.endTime.setMinutes(this.endTime.getMinutes() + minutes);
				this.endTime.setSeconds(this.endTime.getSeconds() + seconds);
				this.paused = false;
				this.pausedTime = null; // 记录暂停时的时间戳
				this.pausedCount = 0;
			}

            // 更新倒计时
            update() {
                const now = this.paused ? this.pausedTime : new Date(); // 使用暂停时间或当前时间
                const timeLeft = this.endTime - now;
                if (timeLeft <= 0) {

                    // 倒计时结束
                    return { hours: 0, minutes: 0, seconds: 0, ended: true };
		
                } else {
                    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                    return { hours, minutes, seconds, ended: false };
                }
            }

			// 暂停倒计时
			pause() {
				if (!this.paused) {
					this.pausedTime = new Date(); // 记录暂停的时间点
					this.paused = true;
					this.pausedCount++;
				}
			}


    // 继续倒计时
    resume() {
        if (this.paused) {
                    const now = new Date();
                    this.endTime.setTime(this.endTime.getTime() + (now - this.pausedTime));
                    this.paused = false;
        }
    }
        }

        // 初始化倒计时
        const countdowns = [
            new Countdown('未设置', 0, 0, 0),
            new Countdown('未设置', 0, 0, 0),
            new Countdown('未设置', 0, 0, 0)
        ];

		// 更新倒计时显示
		function updateCountdownDisplay() {
			// 找到最快结束的、正在运行的倒计时
			let fastestCountdown = null;
			let fastestTimeLeft = Infinity;
			countdowns.forEach(countdown => {
				if (countdown.name !== '未设置' && !countdown.paused) {
					const timeLeft = countdown.endTime - new Date();
					if (timeLeft > 0 && timeLeft < fastestTimeLeft) {
						fastestTimeLeft = timeLeft;
						fastestCountdown = countdown;
					}
				}
			});

			countdowns.forEach((countdown, index) => {
				const countdownElement = document.getElementById(`countdown${index + 1}`);
				const timeLeft = countdown.update();

				countdownElement.innerHTML = ''; // 清空内容，以便重新生成

				// 清除倒计时后的逻辑
				if (countdown.name === '未设置' && timeLeft.ended) {
					countdownElement.classList.remove('countdown-ended'); //自修复对结束的倒计时清除，“未设置”显示为红色的问题
					countdownElement.innerHTML = `
						<div>${countdown.name}</div>
						<div class="countdown-buttons">
							<button onclick="setCountdown(${index})">设置</button>
							<button class="clear-button" onclick="confirmClear(${index})">清除</button>
						</div>`;
				} else if (timeLeft.ended) {
					// 如果倒计时已结束，显示结束时间和按钮
					const pastTime = new Date() - countdown.endTime; // 计算已过去的时间
					const pastHours = Math.floor(pastTime / (1000 * 60 * 60));
					const pastMinutes = Math.floor((pastTime % (1000 * 60 * 60)) / (1000 * 60));
					const pastSeconds = Math.floor((pastTime % (1000 * 60)) / 1000);

					countdownElement.classList.add('countdown-ended');
					countdownElement.innerHTML = `
						<div>${countdown.name}</div>
						<div class="size-1">倒计时结束时间: ${countdown.endTime.toLocaleString()}</div>
						<div class="size-1">距离结束已过去：${pastHours}小时${pastMinutes}分钟${pastSeconds}秒</div>
						<div class="countdown-buttons">
							<button onclick="setCountdown(${index})">设置</button>
							<button class="clear-button" onclick="confirmClear(${index})">清除</button>
						</div>`;
				} else {
					// 如果倒计时正在进行，显示剩余时间和按钮
					const currentCountdownClass = fastestCountdown === countdown ? 'current-countdown' : '';
					countdownElement.innerHTML = `
						<span class="${currentCountdownClass}">   <span class="countdown-name">${countdown.name}</span>
  ${countdown.paused ? '<span class="paused-indicator">暂停中</span>' : ''}</span>
						<div class="size-1">剩余时间: ${timeLeft.hours}小时${timeLeft.minutes}分钟 ${timeLeft.seconds}秒</div>
						<div class="size-1">结束时间: ${countdown.endTime.toLocaleString()}</div>
						<div class="paused-count">暂停次数：${countdown.pausedCount}，最后暂停时间：${countdown.pausedTime ? countdown.pausedTime.toLocaleString() : '无'}</div>
						<div class="countdown-buttons">
							<button class="${countdown.paused ? 'start-button' : 'pause-button'}" onclick="${countdown.paused ? 'startCountdown' : 'pauseCountdown'}(${index})">${countdown.paused ? '开始' : '暂停'}</button>
							<button class="clear-button" onclick="confirmClear(${index})">清除</button>
						</div>`;

					// 如果倒计时暂停，显示“暂停中”指示
					if (countdown.paused) {
						const pauseIndicator = document.createElement('span');
						pauseIndicator.className = 'paused-indicator';
						countdownElement.appendChild(pauseIndicator);
					}

					// 如果倒计时已结束，添加结束时的样式
					if (timeLeft.ended) {
						countdownElement.classList.add('countdown-ended');
					} else {
						// 如果倒计时没有结束，确保没有结束时的样式
						countdownElement.classList.remove('countdown-ended');
					}
				}

				// 刚进入网页时的逻辑
				if (countdown.name === '未设置' /*&& !timeLeft.ended && !countdown.hasSpoken */) {
					countdown.hasSpoken = true; // 设置标志以避免重复播报
				}

				// 倒计时结束时的语音播报逻辑
				if (timeLeft.ended && !countdown.hasSpoken) {
					var name = countdown.name;
					var endTime = countdown.endTime;

					// 检查浏览器是否支持Web Speech API
					if ('speechSynthesis' in window) {
						var synth = window.speechSynthesis;
						const utterance = new SpeechSynthesisUtterance();

						// 设置播报文本
						if (window.speechSynthesis.speaking) {
							// 定义一个函数来检查window.speechSynthesis.speaking的状态
							function checkSpeechSynthesisStatus() {
								// 检查是否还在说话
								if (window.speechSynthesis.speaking) {
									// 如果还在说话，什么都不做
								} else {
									// 如果不在说话，清除定时器
									clearInterval(intervalId);
									performPostClearAction();
								}
							}

							// 设置一个定时器，每0.2秒执行一次checkSpeechSynthesisStatus函数
							var intervalId = setInterval(checkSpeechSynthesisStatus, 200);

							function performPostClearAction() {
								const secondsSinceEnd = Math.floor((new Date() - countdown.endTime) / 1000); // 将时间差转换为秒
								utterance.text = `倒计时${name}已于${secondsSinceEnd}秒前结束`;
								window.speechSynthesis.speak(utterance);
							}
						} else {
							// 如果倒计时刚刚结束，使用正常格式
							utterance.text = `倒计时${name}已结束`;
						}

						utterance.lang = 'zh-CN'; // 设置语言为中文
						utterance.volume = 1.0; // 设置音量为1.0，即最大音量

						// 发送语音合成请求
						synth.speak(utterance);

						// 设置标志以避免重复播报
						countdown.hasSpoken = true;
					} else {
						alert("很抱歉，您的浏览器不支持语音合成功能。");
					}
				}

				// 更新暂停次数的颜色
				const pausedCountElement = countdownElement.querySelector('.paused-count');
				if (pausedCountElement) {
					const pausedCount = countdown.pausedCount;
					let color = '#000'; // 默认黑色
					if (pausedCount > 4) {
						color = '#8B0000'; // 深红色
					} else if (pausedCount > 3) {
						color = '#B22222';
					} else if (pausedCount > 2) {
						color = '#CD5C5C';
					} else if (pausedCount > 1) {
						color = '#F08080';
					} else if (pausedCount > 0) {
						color = '#FFA07A';
					}
					pausedCountElement.style.color = color;
				}
			});
		}


        // 设置倒计时
        function setCountdown(index) {
            const input = prompt('请输入倒计时名称和时间，格式如：“会议 1 1 13”');
            if (!input) {
                return; // 用户取消了输入
            }

            const parts = input.split(' ').map(part => part.trim());
            if (parts.length !== 4) {
                alert('输入错误，请按照格式“名称 小时 分钟 秒”输入！');
                return;
            }

            const [name, hours, minutes, seconds] = parts;
            if (isNaN(hours) || hours < 0 || hours > 24 || isNaN(minutes) || minutes < 0 || minutes > 59 || isNaN(seconds) || seconds < 0 || seconds > 59) {
                alert('时间输入错误，请输入正确的时间！');
                return;
            }

            countdowns[index] = new Countdown(name, parseInt(hours), parseInt(minutes), parseInt(seconds));
            updateCountdownDisplay();
        }

        // 开始倒计时
        function startCountdown(index) {
            countdowns[index].resume();
            updateCountdownDisplay();
        }

        // 暂停倒计时
        function pauseCountdown(index) {
            countdowns[index].pause();
            updateCountdownDisplay();
        }

        // 清除倒计时
        function confirmClear(index) {
            if (confirm('是否确认清除？')) {
                countdowns[index] = new Countdown('未设置', 0, 0, 0);
                updateCountdownDisplay();
            }
        }

        // 更新时钟显示
        function updateClockDisplay() {
            // 找到最快结束的、正在运行的倒计时
            let fastestCountdown = null;
            let fastestTimeLeft = Infinity;
            countdowns.forEach(countdown => {
                if (countdown.name !== '未设置' && !countdown.paused) {
                    const timeLeft = countdown.endTime - new Date();
                    if (timeLeft > 0 && timeLeft < fastestTimeLeft) {
                        fastestTimeLeft = timeLeft;
                        fastestCountdown = countdown;
                    }
                }
            });

            // 如果所有倒计时都未设置或暂停，则将时钟指针归位
            if (fastestCountdown === null) {
                const hourHand = document.getElementById('hourHand');
                const minuteHand = document.getElementById('minuteHand');
                const secondHand = document.getElementById('secondHand');
                hourHand.style.transform = `translate(-50%, -50%) rotate(0rad)`;
                minuteHand.style.transform = `translate(-50%, -50%) rotate(0rad)`;
                secondHand.style.transform = `translate(-50%, -50%) rotate(0rad)`;
                return;
            }

            // 更新时钟显示
            if (fastestCountdown) {
                const timeLeft = fastestCountdown.update();
                const hourHand = document.getElementById('hourHand');
                const minuteHand = document.getElementById('minuteHand');
                const secondHand = document.getElementById('secondHand');

                // 计算时针、分针、秒针的角度
                const hours = timeLeft.hours % 12;
                const minutes = timeLeft.minutes;
                const seconds = timeLeft.seconds;
                const hourAngle = (hours * 30 + minutes / 2) * (Math.PI / 180);
                const minuteAngle = (minutes * 6 + seconds / 10) * (Math.PI / 180);
                const secondAngle = seconds * 6 * (Math.PI / 180);

                // 更时针、分针、秒针的角度
                hourHand.style.transform = `translate(-50%, -50%) rotate(${hourAngle}rad)`;
                minuteHand.style.transform = `translate(-50%, -50%) rotate(${minuteAngle}rad)`;
                secondHand.style.transform = `translate(-50%, -50%) rotate(${secondAngle}rad)`;
            }
        }

        // 切换时钟模式
        function toggleClockMode() {
            // 假设有两种模式，通过改变类名来切换不同的表盘样式
            const clockFace = document.getElementById('clockFace');
            clockFace.classList.toggle('mode1');
            clockFace.classList.toggle('mode2');
			
            // 切换时针、分针、秒针的图片
            const hourHand = document.getElementById('hourHand');
            const minuteHand = document.getElementById('minuteHand');
            const secondHand = document.getElementById('secondHand');

            if (clockFace.classList.contains('mode2')) {
                hourHand.src = '../Resource/hour_hand_mode2.png';
                minuteHand.src = '../Resource/minute_hand_mode2.png';
                secondHand.src = '../Resource/second_hand_mode2.png';
            } else {
                hourHand.src = '../Resource/hour_hand_mode1.png';
                minuteHand.src = '../Resource/minute_hand_mode1.png';
                secondHand.src = '../Resource/second_hand_mode1.png';
            }

            // 弹窗提示切换至哪个模式
            const mode = clockFace.classList.contains('mode2') ? '二次元模式' : '常规模式';
            alert('已切换至' + mode);

            // 切换动画
            const animationImage = document.getElementById('animationImage');
            animationImage.classList.toggle('hidden');
            if (animationImage.classList.contains('hidden')) {
                animationImage.style.animation = 'slideOut 1s forwards';
                setTimeout(() => {
                    animationImage.classList.add('hidden');
                    animationImage.style.animation = 'slideIn 1s forwards';
                }, 1000);
            } else {
                animationImage.style.animation = 'slideIn 1s forwards';
                setTimeout(() => {
                    animationImage.style.animation = 'slideOut 1s forwards';
                }, 1000);
            }
        }

        // 定时更新倒计时和时钟
        setInterval(function() {
            updateCountdownDisplay();
            updateClockDisplay();
        }, 1000);
		
		
		
        // 定义三组背景图片地址
        const mode1Backgrounds = { //常规模式
            clockSection: '../Resource/clock_section_mode1.png',
            countdown1: '../Resource/countdown1_mode1.png',
            countdown2: '../Resource/countdown2_mode1.png',
            countdown3: '../Resource/countdown3_mode1.png'
        };

        const mode2Backgrounds = { //奇幻模式
            clockSection: '../Resource/clock_section_mode2.jpg',
            countdown1: '../Resource/countdown1_mode2.png',
            countdown2: '../Resource/countdown2_mode2.png',
            countdown3: '../Resource/countdown3_mode2.png'
        };

        const mode3Backgrounds = { //二次元模式
            clockSection: '../Resource/clock_section_mode3.jpg',
            countdown1: '../Resource/countdown1_mode3.jpg',
            countdown2: '../Resource/countdown2_mode3.jpg',
            countdown3: '../Resource/countdown3_mode3.jpg'
        };
		
        const mode4Backgrounds = { //钟表模式
            clockSection: '../Resource/clock_section_mode4.png',
            countdown1: '../Resource/countdown1_mode4.png',
            countdown2: '../Resource/countdown2_mode4.png',
            countdown3: '../Resource/countdown3_mode4.png'
        };
		
        const mode5Backgrounds = { //情人节模式
            clockSection: '../Resource/clock_section_mode5.jpg',
            countdown1: '../Resource/countdown1_mode5.jpg',
            countdown2: '../Resource/countdown2_mode5.png',
            countdown3: '../Resource/countdown3_mode5.jpg'
        };

        // 当前模式
        let currentMode = 'mode1_background';

        // 切换模式的函数
        function toggleMode(newMode) {
            currentMode = newMode;
            const backgrounds = {
                'mode1_background': mode1Backgrounds,
                'mode2_background': mode2Backgrounds,
                'mode3_background': mode3Backgrounds,
				'mode4_background': mode4Backgrounds,
				'mode5_background': mode5Backgrounds
            }[currentMode];

            // 更新背景图片
            document.getElementById('clockFace').style.backgroundImage = `url(${backgrounds.clockSection})`;
            document.getElementById('countdown1').style.backgroundImage = `url(${backgrounds.countdown1})`;
            document.getElementById('countdown2').style.backgroundImage = `url(${backgrounds.countdown2})`;
            document.getElementById('countdown3').style.backgroundImage = `url(${backgrounds.countdown3})`;
			document.getElementById('countdown4').style.backgroundImage = `url(${backgrounds.countdown4})`;
			document.getElementById('countdown5').style.backgroundImage = `url(${backgrounds.countdown5})`;
        }

		// 切换背景模式的函数
		function toggleBackgroundMode() {
			const selectedMode = prompt('请选择背景模式：\n1 - 常规模式\n2 - 奇幻模式\n3 - 二次元模式\n4 - 钟表模式\n5 - 情人节模式');
			let newMode;
			switch (selectedMode) {
				case '1':
					newMode = 'mode1_background';
					break;
				case '2':
					newMode = 'mode2_background';
					break;
				case '3':
					newMode = 'mode3_background';
					break;
				case '4':
					newMode = 'mode4_background';
					break;
				case '5':
					newMode = 'mode5_background';
					break;
				default:
					alert('回到当前模式');
					return;
			}
			toggleMode(newMode);
		}

		// 在文档加载完成后初始化事件监听器
		document.addEventListener('DOMContentLoaded', () => {
			// 设置默认模式
			toggleMode('mode1_background');

			// 获取表盘图片元素
			const clockFace = document.getElementById('clockFace');

			// 为表盘图片添加点击事件监听器
			//clockFace.addEventListener('click', toggleBackgroundMode);
		});