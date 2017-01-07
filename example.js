angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']);
angular
  .module('mwl.calendar.docs') //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
  .controller('KitchenSinkCtrl', function(moment, alert, calendarConfig) {

    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    var actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(args) {
        alert.show('Edited', args.calendarEvent);
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(args) {
        alert.show('Deleted', args.calendarEvent);
      }
    }];

    vm.events = [
      // {
      //   title: 'Scheduled Village 1, Emptier: Drumpf',
      //   color: calendarConfig.colorTypes.warning,
      //   startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
      //   endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
      //   draggable: true,
      //   resizable: true,
      //   actions: actions
      // }, {
      //   title: 'Need to Schedule! Village 2',
      //   color: calendarConfig.colorTypes.info,
      //   startsAt: moment().subtract(1, 'day').toDate(),
      //   endsAt: moment().add(5, 'days').toDate(),
      //   draggable: true,
      //   resizable: true,
      //   actions: actions
      // }, {
      //   title: 'Scheduled Village 3',
      //   color: calendarConfig.colorTypes.important,
      //   startsAt: moment().startOf('day').add(7, 'hours').toDate(),
      //   endsAt: moment().startOf('day').add(19, 'hours').toDate(),
      //   recursOn: 'year',
      //   draggable: true,
      //   resizable: true,
      //   actions: actions
      // }
    ];

    $.getJSON("customers.json", function(data) {
      console.log("hello world");
      console.log(data);
    });

    customers = [
      {
        name: 'Phiona Mutesi',
        location: 'Tatu City',
        schedule: 'Mon-8 Fri-10',

      },
      {
        name: 'Robert Katende',
        location: 'Githurai',
        schedule: 'Tue-11:30',
      }
    ];

    customers.forEach(function(c) {
      var dayStrings = c.schedule.split(" ");
      var days = [];
      dayStrings.forEach(function(day) {
        var regexp = /([a-zA-Z]{3})-(\d+)/g;
        var match = regexp.exec(day);
        var num = 0;
        if (match[1] == 'Mon') num = 1;
        else if (match[1] == 'Tue') num = 2;
        else if (match[1] == 'Wed') num = 3;
        else if (match[1] == 'Thu') num = 4;
        else if (match[1] == 'Fri') num = 5;
        days.push({
          dow: num, //day of week
          tod: parseInt(match[2]) //time of day
        });
      });

      days.forEach(function(daySchedule) {
        console.log(daySchedule);
        for (i = 0; i < 5; i++) {
          vm.events.push({
            title: c.name + ", " + c.location,
            color: calendarConfig.colorTypes.info,
            startsAt: moment().weekday(daySchedule.dow + i*7).startOf('day').add(daySchedule.tod, 'hours').toDate(),
            endsAt: moment().weekday(daySchedule.dow + i*7).startOf('day').add(daySchedule.tod + 2, 'hours').toDate(),
            draggable: true,
            resizable: true,
            actions: actions,
            emptiername: '',
            emptiernum: '',
            customer: c.name,
            location: c.location
          });
        }
      });      
    });

    vm.cellIsOpen = true;

    vm.addEvent = function() {
      vm.events.push({
        title: 'New event',
        startsAt: moment().startOf('day').toDate(),
        endsAt: moment().endOf('day').toDate(),
        color: calendarConfig.colorTypes.important,
        draggable: true,
        resizable: true
      });
    };

    vm.editEvent = function(event) {

    }

    vm.eventClicked = function(event) {
      //alert.show('Clicked', event);
      alert.show('Edited', event);
    };

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {

      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }

    };

  });
