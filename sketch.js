let clickCount = 0;  // 클릭 횟수
let shake = 0;  // 은화의 진동 효과 (0이면 정지, 1이면 진동)
let showMessage = false;  // 문구가 보일지 여부

let coinX, coinY;  // 은화의 위치
let coinSpeedX, coinSpeedY;  // 은화의 속도

let startTime;  // 카운트다운 시작 시간
let countdown = 5;  // 5초 카운트다운
let countdownStarted = false;  // 카운트다운이 시작되었는지 여부

function setup() {
  createCanvas(1200, 700);
  textSize(18);
  textAlign(CENTER, CENTER);

  // 은화의 초기 위치
  coinX = width / 2;
  coinY = height / 2;

  // 은화의 초기 속도 (적당한 값으로 설정)
  coinSpeedX = 3;  // X축 속도
  coinSpeedY = 2;  // Y축 속도
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
    textSize(25);
    text('드디어 은이 7번 연단되었습니다. 꽤나 고생하셨군요ㅎ', width / 2, 300);
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
    countdown = 5 - elapsedTime;
    if (countdown <= 0) {
      clickCount = 0;
      countdownStarted = false;  
    }
    textSize(20);
    text('남은 시간: ' + countdown + '초', width / 2, 80);
  }

  // 은화의 위치를 속도에 맞게 업데이트
  coinX += coinSpeedX;
  coinY += coinSpeedY;

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
      let noiseVal = noise(i * 0.1, j * 0.1, millis() * 0.001);  
      let colorVal = map(noiseVal, 0, 1, 100, 150);  
      fill(colorVal, 60, 30);  
      noStroke();
      rect(i, j, 10, 10);  
    }
  }
}

// 망치 모양을 그리는 함수
function drawHammer(x, y) {
  fill(10, 38, 50);  
  rect(x - 10, y - 20, 30, 10);  
  fill(105, 8, 45);  
  rect(x - 5, y, 10, 50);  
}

// 클릭 시 호출되는 함수
function mousePressed() {
  if (!countdownStarted) {
    startTime = millis();  
    countdownStarted = true;
  }

  let d = dist(mouseX, mouseY, coinX, coinY);
  if (d < 40 && !showMessage) {  
    clickCount++;  
    shake = 2;  

    setTimeout(() => {
      shake = 0;
    }, 200);

    if (clickCount >= 7) {
      showMessage = true;  
    }
  }
}
