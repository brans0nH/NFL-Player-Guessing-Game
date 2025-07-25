
document.addEventListener('DOMContentLoaded', () => {
    const playerNameEl = document.getElementById('player-name');
    const teamButtonsEl = document.getElementById('team-buttons');
    const scoreEl = document.getElementById('score');
    const gameContainer = document.getElementById('game-container');
    const resultsContainer = document.getElementById('results-container');
    const finalScoreEl = document.getElementById('final-score');
    const playAgainBtn = document.getElementById('play-again');

    const resultIndicatorEl = document.getElementById('result-indicator');

    let players = [];
    let currentPlayers = [];
    let score = 0;
    let playerIndex = 0;

    const teams = [
        "Arizona Cardinals", "Atlanta Falcons", "Baltimore Ravens", "Buffalo Bills",
        "Carolina Panthers", "Chicago Bears", "Cincinnati Bengals", "Cleveland Browns",
        "Dallas Cowboys", "Denver Broncos", "Detroit Lions", "Green Bay Packers",
        "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Kansas City Chiefs",
        "Las Vegas Raiders", "Los Angeles Chargers", "Los Angeles Rams", "Miami Dolphins",
        "Minnesota Vikings", "New England Patriots", "New Orleans Saints", "New York Giants",
        "New York Jets", "Philadelphia Eagles", "Pittsburgh Steelers", "San Francisco 49ers",
        "Seattle Seahawks", "Tampa Bay Buccaneers", "Tennessee Titans", "Washington Commanders"
    ];

    async function setupGame() {
        console.log("Running setupGame()");
        const response = await fetch('players.json');
        players = await response.json();
        startGame();
    }

    function startGame() {
        console.log("Running startGame()");
        score = 0;
        playerIndex = 0;
        scoreEl.textContent = score;
        currentPlayers = getRandomPlayers(players, 20);
        resultsContainer.style.display = 'none';
        gameContainer.style.display = 'block';
        displayPlayer();
    }

    function getRandomPlayers(allPlayers, count) {
        console.log("Running getRandomPlayers()");
        const shuffled = allPlayers.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function displayPlayer() {
        console.log("Running displayPlayer()");
        if (playerIndex < currentPlayers.length) {
            const player = currentPlayers[playerIndex];
            playerNameEl.textContent = player.name;
            createTeamButtons();
        } else {
            endGame();
        }
    }

    function createTeamButtons() {
        console.log("Running createTeamButtons()");
        teamButtonsEl.innerHTML = '';
        teams.forEach(team => {
            const button = document.createElement('button');
            button.classList.add('team-button');

            const teamName = document.createElement('span');
            teamName.textContent = team;
            button.appendChild(teamName);

            const teamLogo = document.createElement('img');
            teamLogo.src = teamsData[team];
            teamLogo.alt = `${team} Logo`;
            teamLogo.classList.add('team-logo');
            button.appendChild(teamLogo);

            button.addEventListener('click', () => checkAnswer(team));
            teamButtonsEl.appendChild(button);
        });
    }

    function checkAnswer(selectedTeam) {
        console.log("Running checkAnswer()");
        const correctTeam = currentPlayers[playerIndex].team;
        if (selectedTeam === correctTeam) {
            score++;
            scoreEl.textContent = score;
            showResultIndicator('✅');
        } else {
            showResultIndicator('❌');
        }
        playerIndex++;
        setTimeout(() => {
            displayPlayer();
        }, 1000);
    }

    function showResultIndicator(indicator) {
        resultIndicatorEl.textContent = indicator;
        resultIndicatorEl.style.display = 'block';
        setTimeout(() => {
            resultIndicatorEl.style.display = 'none';
        }, 1000);
    }

    function endGame() {
        console.log("Running endGame()");
        gameContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
        finalScoreEl.textContent = score;
    }

    playAgainBtn.addEventListener('click', startGame);

    setupGame();
});
