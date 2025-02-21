let clickCount = 0;  // 클릭 횟수
let shake = 0;  // 은화의 진동 효과 (0이면 정지, 1이면 진동)
let showMessage = false;  // 문구가 보일지 여부

let coinX, coinY;  // 은화의 위치
let coinSpeedX, coinSpeedY;  // 은화의 속도

let startTime;  // 카운트다운 시작 시간
let countdown = 3;  // 5초 카운트다운
let countdownStarted = false;  // 카운트다운이 시작되었는지 여부

function setup() {
  createCanvas(1200, 700);
  textSize(18);
  textAlign(CENTER, CENTER);

  // 은화의 초기 위치
  coinX = width / 2;
  coinY = height / 2;

  // 적당한 속도 설정 (완벽한 중간 속도)
  coinSpeedX = 50;
  coinSpeedY = 20;
}

function draw() {
  background(180, 130, 60);  // 배경 색상
  createDirtTexture();  // 흙의 질감 만들기

  cursor('none');  
  drawHammer(mouseX, mouseY);  // 망치 커서 그리기

  fill(255);

  if (showMessage) {
    textSize(25);
    text('드디어 은이 7번 연단되었습니다. 꽤나 고생하셨군요ㅎ ', width / 2, 300);
    text('이제 해당 성경 구절을 모두가 함께 외쳐주세요!!', width / 2, 350);
  } else {
    // 은화 (회색 동그라미)
    fill(150);
    if (shake > 0) {
      ellipse(coinX + random(-5, 5), coinY + random(-5, 5), 80, 80);
    } else {
      ellipse(coinX, coinY, 80, 80);
    }

    // 클릭 횟수 표시
    text('클릭 횟수: ' + clickCount, width / 2, 50);
  }

  // 카운트다운 표시
  if (countdownStarted) {
    let elapsedTime = int((millis() - startTime) / 1000);
    countdown = 7 - elapsedTime;
    if (countdown <= 0) {
      clickCount = 0;
      countdownStarted = false;  // 카운트다운 중지
    }
    textSize(20);
    text('남은 시간: ' + countdown + '초', width / 2, 80);
  }

  // 적당한 속도로 이동 (너무 빠르지도, 너무 느리지도 않게)
  coinX += coinSpeedX * 0.9;
  coinY += coinSpeedY * 0.9;

  // 경계 반사 (속도를 일정하게 유지)
  if (coinX <= 40 || coinX >= width - 40) {
    coinSpeedX = -Math.abs(coinSpeedX); // 속도를 일정하게 유지하면서 방향만 반전
  }
  if (coinY <= 40 || coinY >= height - 40) {
    coinSpeedY = -Math.abs(coinSpeedY);
  }
}

// 흙의 질감을 만들기 위한 함수
function createDirtTexture() {
  for (let i = 0; i < width; i += 10) {
    for (let j = 0; j < height; j += 10) {
      let noiseVal = noise(i * 0.1, j * 0.1, millis() * 0.001);
      let colorVal = map(noiseVal, 0, 1, 100, 150);
      fill(colorVal, 60, 30);
      noStroke();
      rect(i, j, 10, 10);
    }
  }
}

// 망치 모양을 그리는 함수 (위에 가로로 긴 직사각형)
function drawHammer(x, y) {
  fill(10, 38, 50);
  rect(x - 10, y - 20, 30, 10);  // 망치 머리 부분
  fill(105, 8, 45);
  rect(x - 5, y, 10, 50);  // 망치 손잡이
}

// 클릭 시 호출되는 함수
function mousePressed() {
  // 카운트다운이 시작되지 않았다면 시작
  if (!countdownStarted) {
    startTime = millis();
    countdownStarted = true;
  }

  // 은화를 클릭한 경우만 카운트
  let d = dist(mouseX, mouseY, coinX, coinY);
  if (d < 40 && !showMessage) {  // 문구가 이미 나왔다면 더 이상 클릭하지 않음
    clickCount++;
    shake = 2;  // 은화 진동 시작

    // 0.1초 후 진동 멈추기
    setTimeout(() => {
      shake = 0;
    }, 200);

    if (clickCount >= 7) {
      showMessage = true;  // 문구 표시
    }
  }
}
