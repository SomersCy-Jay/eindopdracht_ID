let competition = 'CL';

const changeTable = function (width) {
  const playeds = this.document.querySelectorAll('.js-played');
  const wons = this.document.querySelectorAll('.js-won');
  const draws = this.document.querySelectorAll('.js-draw');
  const losts = this.document.querySelectorAll('.js-lost');
  const points = this.document.querySelectorAll('.js-points');

  if (width < 700) {
    console.log('kleiner dan 700');

    for (const p of playeds) {
      p.innerHTML = 'P';
    }

    for (const w of wons) {
      w.innerHTML = 'W';
    }

    for (const d of draws) {
      d.innerHTML = 'D';
    }

    for (const l of losts) {
      l.innerHTML = 'L';
    }

    for (const pts of points) {
      pts.innerHTML = 'Pts';
    }
  } else {
    for (const p of playeds) {
      p.innerHTML = 'Played';
    }
    for (const w of wons) {
      w.innerHTML = 'Won';
    }

    for (const d of draws) {
      d.innerHTML = 'Draw';
    }

    for (const l of losts) {
      l.innerHTML = 'Lost';
    }

    for (const pts of points) {
      pts.innerHTML = 'Points';
    }
  }
};

window.addEventListener('resize', function () {
  changeTable(window.innerWidth);
});

console.log(window.innerWidth);
if (window.innerWidth < 700) {
  changeTable(window.innerWidth);
}

const toggleNav = function () {
  let toggleTrigger = document.querySelectorAll('.js-toggle-nav');
  for (let i = 0; i < toggleTrigger.length; i++) {
    toggleTrigger[i].addEventListener('click', function () {
      document.querySelector('body').classList.toggle('has-mobile-nav');
    });
  }
};

const changeView = function () {
  const standings = document.querySelectorAll('.js-nav--option1');
  const matches = document.querySelectorAll('.js-nav--option2');
  const topscorers = document.querySelectorAll('.js-nav--option3');
  const tableStandings = document.querySelector('.js-standings');
  const tableMatches = document.querySelector('.js-fixtures');
  const tableTopscorers = document.querySelector('.js-topscorers');
  const results = document.querySelectorAll('.js-nav--option4');
  const tableResults = document.querySelector('.js-results');

  for (const btn of standings) {
    btn.addEventListener('click', function () {
      document.querySelector('body').classList.remove('has-mobile-nav');
      for (const b of matches) {
        b.classList.remove('is-selected');
      }
      for (const b of topscorers) {
        b.classList.remove('is-selected');
      }
      for (const b of results) {
        b.classList.remove('is-selected');
      }
      btn.classList.add('is-selected');

      tableMatches.classList.add('u-hide');
      tableTopscorers.classList.add('u-hide');
      tableResults.classList.add('u-hide');
      tableStandings.classList.remove('u-hide');
    });
  }

  for (const btn of matches) {
    btn.addEventListener('click', function () {
      document.querySelector('body').classList.remove('has-mobile-nav');
      for (const b of standings) {
        b.classList.remove('is-selected');
      }
      for (const b of topscorers) {
        b.classList.remove('is-selected');
      }
      for (const b of results) {
        b.classList.remove('is-selected');
      }
      btn.classList.add('is-selected');

      tableTopscorers.classList.add('u-hide');
      tableStandings.classList.add('u-hide');
      tableResults.classList.add('u-hide');
      tableMatches.classList.remove('u-hide');
    });
  }

  for (const btn of topscorers) {
    btn.addEventListener('click', function () {
      document.querySelector('body').classList.remove('has-mobile-nav');
      for (const b of matches) {
        b.classList.remove('is-selected');
      }
      for (const b of standings) {
        b.classList.remove('is-selected');
      }
      for (const b of results) {
        b.classList.remove('is-selected');
      }
      btn.classList.add('is-selected');

      tableStandings.classList.add('u-hide');
      tableMatches.classList.add('u-hide');
      tableResults.classList.add('u-hide');
      tableTopscorers.classList.remove('u-hide');
    });
  }

  for (const btn of results) {
    btn.addEventListener('click', function () {
      document.querySelector('body').classList.remove('has-mobile-nav');
      for (const b of matches) {
        b.classList.remove('is-selected');
      }
      for (const b of topscorers) {
        b.classList.remove('is-selected');
      }
      for (const b of standings) {
        b.classList.remove('is-selected');
      }
      btn.classList.add('is-selected');

      tableStandings.classList.add('u-hide');
      tableMatches.classList.add('u-hide');
      tableTopscorers.classList.add('u-hide');
      tableResults.classList.remove('u-hide');
    });
  }
};

const getStandings = function (competition) {
  jQuery
    .ajax({
      headers: { 'X-Auth-Token': '506747d80bd74b80b0119f6b6aec04e0' },
      url: `http://api.football-data.org/v2/competitions/${competition}/standings`,
      dataType: 'json',
      type: 'GET',
    })
    .done(function (jsonObject) {
      //console.log(jsonObject);

      let standings = document.querySelector('.js-standings');
      let htmlString = '';
      for (const i of jsonObject.standings) {
        //console.log(i);
        let group = i.group;
        if (group == null) {
          group = document.querySelector('.js-competition').options[document.querySelector('.js-competition').selectedIndex].text;
        }

        //console.log(group);
        if (i.table.length != 0) {
          htmlString += `<div class="c-standings">
          <h1>${group}</h1>
        <table class="c-info">
            <tr>
              <th class="c-team-position">
              
              </th>
                <th class="c-titel-team-naam">
                    
                </th>
                <th class="c-titel-team-played js-played">
                    Played
                </th>
                <th class="c-titel-team-won js-won">
                    Won
                </th>
                <th class="c-titel-team-draw js-draw">
                    Draw
                </th>
                <th class="c-titel-team-lost js-lost">
                    Lost
                </th>
                <th class="c-titel-team-points js-points">
                    Points
                </th>
            </tr>`;
          //console.log(group);
          for (const a of i.table) {
            const won = a.won;
            const draw = a.draw;
            const lost = a.lost;
            const points = a.points;
            const played = a.playedGames;
            const team = a.team.name;
            const teamlogo = a.team.crestUrl;
            const position = a.position;

            htmlString += `<tr>
            <td class="c-position">
                ${position}
            </td>
            <td class="c-team">
                <img src="${teamlogo}" alt="picture of logo from the team">
                ${team}
            </td>
            <td class='c-team-played'>
                ${played}
            </td>
            <td class="c-team-won">
                ${won}
            </td>
            <td class="c-team-draw">
                ${draw}
            </td>
            <td class="c-team-lost">
                ${lost}
            </td>
            <td class="c-team-points">
                ${points}
            </td>
        </tr>`;
          }
          htmlString += `</table>
          </div>`;
        }
      }
      standings.innerHTML = htmlString;
    });
};

const getResults = function (competition) {
  let url;
  if (competition == 'CL') {
    url = `http://api.football-data.org/v2/competitions/${competition}/matches?status=FINISHED&stage=GROUP_STAGE`;
  } else {
    url = `http://api.football-data.org/v2/competitions/${competition}/matches?status=FINISHED`;
  }
  jQuery
    .ajax({
      headers: { 'X-Auth-Token': '506747d80bd74b80b0119f6b6aec04e0' },
      url: url,
      dataType: 'json',
      type: 'GET',
    })
    .done(function (jsonObject) {
      let result = document.querySelector('.js-results');
      htmlString = `<tr>
      <th class="c-hometeam">
          Home team
      </th>
      <th class="c-awayteam">
          Away Team
      </th>
      <th class="c-result">
          Result
      </th>
  </tr>`;

      for (const i of jsonObject.matches) {
        const awayTeam = i.awayTeam.name;
        const homeTeam = i.homeTeam.name;
        const scoreHome = i.score.fullTime.homeTeam;
        const scoreAway = i.score.fullTime.awayTeam;

        htmlString += `<tr class="c-match">
        <td class="c-hometeam">
            ${homeTeam}
        </td>
        <td class='c-awayteam'>
            ${awayTeam}
        </td>
        <td class="c-result">
            ${scoreHome} - ${scoreAway}
        </td>
    </tr>`;
      }

      result.innerHTML = htmlString;
    });
};

const getFixtures = function (competition) {
  jQuery
    .ajax({
      headers: { 'X-Auth-Token': '506747d80bd74b80b0119f6b6aec04e0' },
      url: `http://api.football-data.org/v2/competitions/${competition}/matches?status=SCHEDULED`,
      dataType: 'json',
      type: 'GET',
    })
    .done(function (jsonObject) {
      let fixtures = document.querySelector('.js-fixtures');
      htmlString = `<tr>
      <th class="c-hometeam">
          Home team
      </th>
      <th class="c-awayteam">
          Away team
      </th>
      <th class="c-date">
          Date
      </th>
      <th class="c-hour">
          hour
      </th>
  </tr>`;

      for (const i of jsonObject.matches) {
        const awayTeam = i.awayTeam.name;
        const homeTeam = i.homeTeam.name;
        const utcdate = i.utcDate;
        const date = utcdate.substring(0, 10);
        const hour = utcdate.substring(11, 16);

        htmlString += `<tr class="c-match">
        <td class="c-hometeam">
            ${homeTeam}
        </td>
        <td class='c-awayteam'>
            ${awayTeam}
        </td>
        <td class="c-date">
            ${date}
        </td>
        <td class="c-hour">
            ${hour}
        </td>
    </tr>`;
      }
      fixtures.innerHTML = htmlString;
    });
};

const getTopScorers = function (competition) {
  jQuery
    .ajax({
      headers: { 'X-Auth-Token': '506747d80bd74b80b0119f6b6aec04e0' },
      url: `http://api.football-data.org/v2/competitions/${competition}/scorers`,
      dataType: 'json',
      type: 'GET',
    })
    .done(function (jsonObject) {
      console.log(jsonObject);

      let topscorers = document.querySelector('.js-topscorers');
      let htmlString = `<tr>
      <th class="c-player-name">
          Name
      </th>
      <th class='c-player-team'>
          Team
      </th>
      <th class="c-goals">
          goals   
      </th>
  </tr>`;

      for (const i of jsonObject.scorers) {
        let svgs = 0;
        const name = i.player.name;
        const team = i.team.name;
        const goals = i.numberOfGoals;

        htmlString += `<tr class="c-player">
        <td class="c-player-name">
            ${name}
        </td>
        <td class='c-player-team'>
            ${team}
        </td>
        <td class="c-goals">`;
        if (goals < 9) {
          while (svgs < goals) {
            htmlString += `<svg class="c-bal${svgs}"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="113" height="111.5" viewBox="0 0 113 111.5">
            <image id="NoPath_-_kopie_8_" data-name="NoPath - kopie (8)" width="113" height="111.5" xlink:href="data:image/jpeg;base64,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"/>
            </svg>`;
            svgs += 1;
          }
        } else {
          htmlString += `<svg class="c-bal"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="113" height="111.5" viewBox="0 0 113 111.5">
          <image id="NoPath_-_kopie_8_" data-name="NoPath - kopie (8)" width="113" height="111.5" xlink:href="data:image/jpeg;base64,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"/>
          </svg> ${goals}`;
        }

        htmlString += `</td>
        </tr>`;
      }
      topscorers.innerHTML = htmlString;
    });
};

const listenToCompetition = function () {
  const choices = document.querySelector('.js-competition');
  choices.addEventListener('change', function () {
    competition = choices.value;
    console.log(competition);
    getStandings(competition);
    getResults(competition);
    getFixtures(competition);
    getTopScorers(competition);
  });
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('Script loaded');
  toggleNav();
  getStandings(competition);
  getResults(competition);
  getFixtures(competition);
  getTopScorers(competition);
  changeView();
  listenToCompetition();
});
