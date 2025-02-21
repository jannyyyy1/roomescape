let clickCount = 0;  // 클릭 횟수
let shake = 0;  // 은화의 진동 효과 (0이면 정지, 1이면 진동)
let showMessage = false;  // 문구가 보일지 여부

let coinX, coinY;  // 은화의 위치
let coinSpeedX, coinSpeedY;  // 은화의 속도

let startTime;  // 카운트다운 시작 시간
let countdown = 5;  // 8초 카운트다운
let countdownStarted = false;  // 카운트다운이 시작되었는지 여부

function setup() {
  createCanvas(1200, 700);
  textSize(18);
  textAlign(CENTER, CENTER);

  // 은화의 초기 위치
  coinX = width / 2;
  coinY = height / 2;

  // 은화의 초기 속도 (기본 속도 설정)
  coinSpeedX = 3;  // X축 속도
  coinSpeedY = 3;  // Y축 속도
}

function draw() {
  // 흙 도가니 같은 배경 만들기 (흙색을 조금 더 옅게 변경)
  background(180, 130, 60);  // 더 옅은 흙색 배경
  createDirtTexture();  // 흙의 질감을 만들기 위한 함수 호출

  // 망치 모양 커서
  cursor('none');  // 기본 커서 숨김
  drawHammer(mouseX, mouseY);  // 망치 모양을 커서 위치에 그리기

  // 모든 글자 색상을 흰색으로 변경
  fill(255);
  
  if (showMessage) {
    // 클릭 횟수와 은화는 더 이상 보이지 않음
    textSize(25);
    text('드디어 은이 7번 연단되었습니다. 꽤나 고생하셨군요ㅎ ', width / 2, 300);
    text('이제 해당 성경 구절을 모두가 함께 외쳐주세요!!', width / 2, 350);
  } else {
    // 은화 (회색 동그라미)
    fill(150);
    if (shake > 0) {
      // 은화가 진동할 때 약간 위치를 변경하여 진동 효과 주기
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
    countdown = 5 - elapsedTime;
    if (countdown <= 0) {
      // 8초가 지나면 클릭 횟수 초기화
      clickCount = 0;
      countdownStarted = false;  // 카운트다운 중지
    }
    textSize(20);
    text('남은 시간: ' + countdown + '초', width / 2, 80);
  }

  // 은화의 위치를 속도에 맞게 업데이트
  coinX += coinSpeedX*0.5;
  coinY += coinSpeedY*0.5;

  // 은화가 캔버스의 경계를 넘어가지 않도록 처리
  if (coinX <= 40 || coinX >= width - 40) {
    coinSpeedX *= -1;  // x축 속도 반전
  }
  if (coinY <= 40 || coinY >= height - 40) {
    coinSpeedY *= -1;  // y축 속도 반전
  }
}

// 흙의 질감을 만들기 위한 함수
function createDirtTexture() {
  for (let i = 0; i < width; i += 10) {
    for (let j = 0; j < height; j += 10) {
      let noiseVal = noise(i * 0.1, j * 0.1, millis() * 0.001);  // 노이즈 값으로 질감 생성
      let colorVal = map(noiseVal, 0, 1, 100, 150);  // 노이즈에 따른 색 변화
      fill(colorVal, 60, 30);  // 흙 색상
      noStroke();
      rect(i, j, 10, 10);  // 작은 사각형을 배경에 배치
    }
  }
}

// 망치 모양을 그리는 함수 (위에 가로로 긴 직사각형)
function drawHammer(x, y) {
  fill(10, 38, 50);  // 진한 고동색
  rect(x - 10, y - 20, 30, 10);  // 망치 머리 부분 (가로로 긴 직사각형)
  fill(105, 8, 45);  // 진한 고동색
  rect(x - 5, y, 10, 50);  // 망치 손잡이 (직사각형)
}

// 클릭 시 호출되는 함수
function mousePressed() {
  // 카운트다운이 시작되지 않았다면 시작
  if (!countdownStarted) {
    startTime = millis();  // 카운트다운 시작 시간 기록
    countdownStarted = true;
  }

  // 은화를 클릭한 경우만 카운트
  let d = dist(mouseX, mouseY, coinX, coinY);
  if (d < 40 && !showMessage) {  // 문구가 이미 나왔다면 더 이상 클릭하지 않도록
    clickCount++;  // 클릭 횟수 증가
    shake = 2;  // 은화 진동 시작

    // 0.1초 후 진동 멈추기
    setTimeout(() => {
      shake = 0;
    }, 200);

    if (clickCount >= 7) {
      showMessage = true;  // 문구가 보이도록 설정
    }
  }
}
