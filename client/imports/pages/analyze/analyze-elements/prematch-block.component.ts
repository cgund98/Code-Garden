import { Component, OnInit, Input, Output, EventEmitter,
         OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import template from './prematch-block.component.html';

import { Matches } from '../../../../../both/collections/matches.collection';

@Component({
  selector: 'prematch-block',
  template
})

export class PrematchBlockComponent implements OnInit {

  matches;
  @Input() teamNum: number;

  @Output() update = new EventEmitter();

  autonRows = [{propName: "Click me!"},];
  teleopRows;

  autonColumns = [
  { name: '<p>Auton</p>', 
    prop: 'propName', width: 85 },
  { name: 'Fails', prop: 'fails', width: 75 },
  { name: 'Singles', prop: 'singles', width: 75 },
  { name: 'Multi', prop: 'multis', width: 75 },
  ];

  teleopColumns = [
  { name: '<p>Teleop</p>', prop: 'location', width: 85 },
  { name: 'Avg', prop: 'average', width: 75 },
  { name: 'Eff', prop: 'efficiency', width: 75 },
  { name: 'Max', prop: 'max', width: 75 },
  ];

  ngOnInit() {
    this.matches = Matches.find({event: '2018cur'}).fetch();
    if (this.matches.length > 0) {
      this.refresh();
    }
  }

  updateTeamNum(event: any) {
    this.teamNum = parseInt(event.target.value);
    this.refresh();
    this.emit();
  }

  emit() {
    var out = {
      teamNum: this.teamNum
    };
    this.update.emit(out);
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {

    var teamStats = this.getTeamStats();

    if (teamStats.missing) {
      autonRows = [
      { propName: 'Missing!' },
      { propName: 'Missing!' },
      { propName: 'Missing!' },
      ];
      teleopRows = [
      { location: 'Missing!' },
      { location: 'Missing!' },
      { location: 'Missing!' },
      ];
      this.autonRows = autonRows;
      this.teleopRows = teleopRows;
      return;
    }

    this.autonRows = this.getAutonRows(teamStats);
    this.teleopRows = this.getTeleopRows(teamStats);
  }

  getTeamStats() {
    this.matches = Matches.find({event: '2018cur'}).fetch();

    var teamStats = {
      missing: true,
      matchesPlayed: 1,
      totalPickedUp: 0,
      totalPlaced: 0,
      climbs: 0,
      switchTeleopPlaced: 0,
      exchangeTeleopPlaced: 0,
      highTeleopPlaced: 0,
      switchAutonPlaced: 0,
      switchAutonSingles: 0,
      switchAutonMultis: 0,
      switchAutonFails: 0,
      highAutonSingles: 0,
      highAutonMultis: 0,
      highAutonFails: 0,
      highAutonPlaced: 0,
      switchTeleopMissed: 0,
      highTeleopMissed: 0,
      switchAutonMissed: 0,
      highAutonMissed: 0,
      runs: 0,
      autonLineCrosses: 0,
      exchangeAutonPlaced: 0,
      exchangeAutonSingles: 0,
      exchangeAutonMultis: 0,
      exchangeAutonFails: 0,
      exchangeTeleopMissed: 0,
      exchangeAutonMissed: 0,
      runTimes: [],
    };

    for (var i=0; i < this.matches.length; i++) {
      var match = this.matches[i];
      var matchSwitchAutonFails = 0; var matchExchangeAutonFails = 0; var matchSwitchAuton = 0; var matchExchangeAuton = 0;
      var matchLowAuton = 0; var matchHighAuton = 0; var matchLowAutonFails = 0; var matchHighAutonFails = 0;
      if (this.teamNum == match.teamNum ) {
        teamStats.missing = false;
        teamStats.matchesPlayed += 1;
        teamStats.totalPickedUp += match.totalPickedUp;
        teamStats.runs += match.runs.length;
        teamStats.autonLineCrosses += ((match.autonLineCrossed) ? 1 : 0);

        if (match.climbed) {
          teamStats.climbs += 1;
        }
        if (!teamStats.runTimes) {
          teamStats.runTimes = [];
        }

        // for (var k=0; k < match.runs.length; k++) {
        //   var run = match.runs[k];
        //   if (!run.missedShot) {
        //     if (run.placeLocation.includes('middle')) {
        //       if (run.isAuton) {
        //         teamStats.highAutonPlaced +=1;
        //         matchHighAuton += 1;
        //       } else {
        //         teamStats.highTeleopPlaced += 1;
        //       }
        //     } else {
        //       if (run.isAuton) {
        //         teamStats.lowAutonPlaced +=1;
        //         matchLowAuton +=1;
        //       } else {
        //         teamStats.lowTeleopPlaced += 1;
        //       }
        //     }
        //   } else {
        //     if (run.placeLocation.includes('middle')) {
        //       if (run.isAuton) {
        //         teamStats.highAutonMissed +=1;
        //         matchHighAutonFails += 1;
        //       } else {
        //         teamStats.highTeleopMissed += 1;
        //       }
        //     } else {
        //       if (run.isAuton) {
        //         teamStats.lowAutonMissed +=1;
        //         matchLowAutonFails += 1;
        //       } else {
        //         teamStats.lowTeleopMissed += 1;
        //       }
        //     }
        //   }

        //   if (run.timeElapsed) {
        //     teamStats.runTimes.push(run.timeElapsed);
        //   }
        // }
        for (var k=0; k < match.runs.length; k++) {
          var run = match.runs[k];
          if (!run.missedShot) {
            if (run.placeLocation.includes('middle')) {
              if (run.isAuton) {
                teamStats.highAutonPlaced +=1;
                matchHighAuton += 1;
              } else {
                teamStats.highTeleopPlaced += 1;
              }
            } else if (run.placeLocation.includes('powerup')) {
              if (run.isAuton) {
                teamStats.exchangeAutonPlaced +=1;
                matchExchangeAuton += 1;
              } else {
                teamStats.exchangeTeleopPlaced += 1;
              }
            } else {
              if (run.isAuton) {
                teamStats.switchAutonPlaced +=1;
                matchSwitchAuton += 1;
              } else {
                teamStats.switchTeleopPlaced += 1;
              }
            }
          } else {
            if (run.placeLocation.includes('middle')) {
              if (run.isAuton) {
                matchHighAutonFails += 1;
                teamStats.highAutonMissed +=1;
              } else {
                teamStats.highTeleopMissed += 1;
              }
            } else if (run.placeLocation.includes('powerup')) {
              if (run.isAuton) {
                matchExchangeAutonFails += 1;
                teamStats.exchangeAutonMissed +=1;
              } else {
                teamStats.exchangeTeleopMissed += 1;
              }
            } else {
              if (run.isAuton) {
                matchSwitchAutonFails += 1;
                teamStats.switchAutonMissed +=1;
              } else {
                teamStats.switchTeleopMissed += 1;
              }
            }
          }

          if (run.timeElapsed) {
            teamStats.runTimes.push(run.timeElapsed);
          }
        }
      }
      // console.log(matchHighAuton);
      teamStats.highAutonSingles += ((matchHighAuton == 1) ? 1: 0);
      teamStats.highAutonMultis += ((matchHighAuton > 1) ? 1: 0);
      teamStats.highAutonFails += ((matchHighAutonFails > 0 && matchHighAuton == 0 && matchHighAuton == 0) ? 1 : 0);
      teamStats.switchAutonSingles += ((matchSwitchAuton == 1) ? 1: 0);
      teamStats.switchAutonMultis += ((matchSwitchAuton > 1) ? 1: 0);
      teamStats.switchAutonFails += ((matchSwitchAutonFails > 0 && matchLowAuton == 0 && matchLowAuton == 0) ? 1 : 0);
      teamStats.exchangeAutonSingles += ((matchExchangeAuton == 1) ? 1: 0);
      teamStats.exchangeAutonMultis += ((matchExchangeAuton > 1) ? 1: 0);
      teamStats.exchangeAutonFails += ((matchExchangeAutonFails > 0 && matchLowAuton == 0 && matchLowAuton == 0) ? 1 : 0);
      
    }
    return teamStats;
  }

  getAutonRows(teamStats) {

    var exchangeRow = {
      propName: 'Exchange',
      fails: teamStats.exchangeAutonFails,
      singles: teamStats.exchangeAutonSingles,
      multis: teamStats.exchangeAutonMultis,
    };
    var switchRow = {
      propName: 'Switch',
      fails: teamStats.switchAutonFails,
      singles: teamStats.switchAutonSingles,
      multis: teamStats.switchAutonMultis,
    };
    var scaleRow = {
      propName: 'Scale',
      fails: teamStats.highAutonFails,
      singles: teamStats.highAutonSingles,
      multis: teamStats.highAutonMultis,
    };
    var lineRow = {
      propName: 'Line',
      fails: teamStats.matchesPlayed - teamStats.autonLineCrosses,
      singles: teamStats.autonLineCrosses,
    };

    var rows = [exchangeRow, switchRow, scaleRow, lineRow];
    return rows;
  }

  getTeleopRows(teamStats) {

    var highTeleopTotal = teamStats.highTeleopPlaced + teamStats.highTeleopMissed;
    var switchTeleopTotal = teamStats.switchTeleopPlaced + teamStats.switchTeleopMissed;
    var exchangeTeleopTotal = teamStats.exchangeTeleopPlaced + teamStats.exchangeTeleopMissed;

    var exchangeRow = {
      location: 'Exchange',
      average: parseFloat(teamStats.exchangeTeleopPlaced) / teamStats.matchesPlayed,
      efficiency: parseFloat(teamStats.exchangeTeleopPlaced) / exchangeTeleopTotal,
    };
    var switchRow = {
      location: 'Switch',
      average: parseFloat(teamStats.switchTeleopPlaced) / teamStats.matchesPlayed,
      efficiency: parseFloat(teamStats.switchTeleopPlaced) / switchTeleopTotal,
    };
    var scaleRow = {
      location: 'Scale',
      average: parseFloat(teamStats.highTeleopPlaced) / teamStats.matchesPlayed,
      efficiency: parseFloat(teamStats.highTeleopPlaced) / highTeleopTotal,
    };
    var climbRow = {
      location: 'Climbs',
      average: teamStats.climbs,
    };

    var rows = [exchangeRow, switchRow, scaleRow, climbRow];
    return rows;
  }

}