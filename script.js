const teamRatings = {
    'Mumbai Indians': 92,
    'Chennai Super Kings': 89,
    'Royal Challengers Bangalore': 85,
    'Kolkata Knight Riders': 86,
    'Sunrisers Hyderabad': 84,
    'Delhi Capitals': 83,
    'Punjab Kings': 80,
    'Rajasthan Royals': 82,
    'Lucknow Super Giants': 81,
    'Gujarat Titans': 88
};

const homeVenues = {
    'Mumbai Indians': ['Mumbai'],
    'Chennai Super Kings': ['Chennai'],
    'Royal Challengers Bangalore': ['Bangalore'],
    'Kolkata Knight Riders': ['Kolkata'],
    'Sunrisers Hyderabad': ['Hyderabad'],
    'Delhi Capitals': ['Delhi'],
    'Punjab Kings': ['Mohali'],
    'Rajasthan Royals': ['Jaipur'],
    'Lucknow Super Giants': ['Lucknow'],
    'Gujarat Titans': ['Ahmedabad']
};

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    const form = document.getElementById('prediction-form');
    if (form) {
        form.addEventListener('submit', handlePredictionSubmit);
    }
}

function handlePredictionSubmit(event) {
    event.preventDefault();

    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;
    const venue = document.getElementById('venue').value;
    const tossWinnerChoice = document.getElementById('toss-winner').value;
    const tossDecision = document.getElementById('toss-decision').value;
    const resultElement = document.getElementById('prediction-result');

    if (!team1 || !team2 || !tossWinnerChoice || !tossDecision) {
        updateResult('Please choose both teams, toss winner, and decision before predicting.');
        return;
    }

    if (team1 === team2) {
        updateResult('Please select two different teams for a valid match prediction.');
        return;
    }

    const tossWinner = tossWinnerChoice === 'team1' ? team1 : team2;
    const prediction = generatePrediction(team1, team2, venue, tossWinner, tossDecision);

    if (resultElement) {
        resultElement.innerHTML = `<h3>Prediction Result</h3><p>${prediction}</p>`;
    }
}

function generatePrediction(team1, team2, venue, tossWinner, tossDecision) {
    const base1 = teamRatings[team1] || 78;
    const base2 = teamRatings[team2] || 78;
    let score1 = base1;
    let score2 = base2;

    if (tossWinner === team1) {
        score1 += 4;
    } else {
        score2 += 4;
    }

    if (tossDecision === 'bat') {
        if (tossWinner === team1) score1 += 2;
        else score2 += 2;
    } else {
        if (tossWinner === team1) score1 += 1;
        else score2 += 1;
    }

    score1 += getVenueAdvantage(team1, venue);
    score2 += getVenueAdvantage(team2, venue);

    const ratingGap = Math.abs(score1 - score2);
    const margin = Math.max(1, Math.round(ratingGap / 3 + getRandomInt(0, 3)));
    const winner = score1 >= score2 ? team1 : team2;
    const loser = winner === team1 ? team2 : team1;
    const decisionPhrase = tossDecision === 'bat' ? 'batting first' : 'bowling first';

    return `The demo prediction favors <strong>${winner}</strong> over <strong>${loser}</strong> by about <strong>${margin} ${margin === 1 ? 'run' : 'runs'}</strong>, based on team strengths, toss outcome, and venue. ${tossWinner} won the toss and chose ${decisionPhrase}.`;
}

function getVenueAdvantage(team, venue) {
    const homeCities = homeVenues[team] || [];
    return homeCities.includes(venue) ? 3 : 0;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateResult(message) {
    const resultElement = document.getElementById('prediction-result');
    if (resultElement) {
        resultElement.innerHTML = `<h3>Prediction Result</h3><p>${message}</p>`;
    }
}

console.log('IPL prediction script loaded.');