const WAIT_TIME = 100;

describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

/* Starter tests to find elements on page */
describe('Find Settings Elements', { includeShadowDom: true }, () => {
  it("Get element ('Settings')", () => {
    cy.get('label');
  });
});

describe('Check Initial State of Elements', { includeShadowDom: true }, () => {
  it('Check that element says Settings', () => {
    cy.get('h1').then(($el) => {
      expect($el).to.contain('Settings');
    });
  });
});

/* Add your own tests here */
describe('Test sidebar elements', () => {
  beforeEach(() => {
    cy.visit('./source');
    cy.get('#settings-button').click();
  });

  it('Sidebar opens when gear is pressed', { includeShadowDom: true }, () => {
    cy.get('#settings-close-button').click();
    cy.get('#settings-button').click();
    cy.get('#settings').then(($el) => {
      expect($el).to.have.attr('class', 'open');
    });
  });

  it('Sidebar closes when x is pressed', { includeShadowDom: true }, () => {
    cy.get('#settings-close-button').click();
    cy.get('#settings').then(($el) => {
      expect($el).to.have.attr('class', 'close');
    });
  });

  it('Sidebar closes when clicking outside of sidebar', { includeShadowDom: true }, () => {
    cy.get('body').click();
    cy.get('#settings').then(($el) => {
      expect($el).to.have.attr('class', 'close');
    });
  });

  it('Volume input changes when slider changes', { includeShadowDom: true }, () => {
    cy.get('#volume-slide').invoke('val', 20).trigger('change');
    cy.get('#volume-number').then(($el) => {
      expect($el).to.have.value(20);
    });
  });

  it('Slider changes when volume input changes', { includeShadowDom: true }, () => {
    cy.get('#volume-number').clear({ force: true }).type('80', { force: true }).trigger('change');
    cy.get('#volume-slide').then(($el) => {
      expect($el).to.have.value(80);
    });
  });

  it('On blank input, number inputs revert to min', { includeShadowDom: true }, () => {
    cy.get('#work-number').type('{selectall}{backspace}', { force: true }).trigger('change');
    cy.get('#work-number').then(($el) => {
      expect($el).to.have.value(1);
    });
    cy.get('#short-break-number').type('{selectall}{backspace}', { force: true }).trigger('change');
    cy.get('#short-break-number').then(($el) => {
      expect($el).to.have.value(1);
    });
    cy.get('#long-break-number').type('{selectall}{backspace}', { force: true }).trigger('change');
    cy.get('#long-break-number').then(($el) => {
      expect($el).to.have.value(1);
    });
    cy.get('#volume-number').type('{selectall}{backspace}', { force: true }).trigger('change');
    cy.get('#volume-number').then(($el) => {
      expect($el).to.have.value(0);
    });
  });

  it('volumeNumber inputs lower than lower bound become 0', { includeShadowDom: true }, () => {
    cy.get('#volume-number').type('{selectall}{backspace}-1', { force: true }).trigger('change');
    cy.wait(WAIT_TIME);
    cy.get('#volume-number').then(($el) => {
      expect($el).to.have.value(0);
    });
  });

  it('workNumber inputs lower than lower bound become 1', { includeShadowDom: true }, () => {
    cy.get('#work-number').type('{selectall}{backspace}-1', { force: true }).trigger('change');
    cy.wait(WAIT_TIME);
    cy.get('#work-number').then(($el) => {
      expect($el).to.have.value(1);
    });
  });

  it('shortBreakNumber inputs lower than lower bound become 1', { includeShadowDom: true }, () => {
    cy.get('#short-break-number')
      .type('{selectall}{backspace}-1', { force: true })
      .trigger('change');
    cy.wait(WAIT_TIME);
    cy.get('#short-break-number').then(($el) => {
      expect($el).to.have.value(1);
    });
  });

  it('longBreakNumber inputs lower than lower bound become 1', { includeShadowDom: true }, () => {
    cy.get('#long-break-number')
      .type('{selectall}{backspace}-1', { force: true })
      .trigger('change');
    cy.wait(WAIT_TIME);
    cy.get('#long-break-number').then(($el) => {
      expect($el).to.have.value(1);
    });
  });

  it('volumeNumber inputs higher than upper bound become 100', { includeShadowDom: true }, () => {
    cy.get('#volume-number').type('{selectall}{backspace}200', { force: true }).trigger('change');
    cy.wait(WAIT_TIME);
    cy.get('#volume-number').then(($el) => {
      expect($el).to.have.value(100);
    });
  });

  it('workNumber inputs higher than upper bound become 60', { includeShadowDom: true }, () => {
    cy.get('#work-number').type('{selectall}{backspace}200', { force: true }).trigger('change');
    cy.wait(WAIT_TIME);
    cy.get('#work-number').then(($el) => {
      expect($el).to.have.value(60);
    });
  });

  it('shortBreakNumber input higher than upper bound become 60', { includeShadowDom: true }, () => {
    cy.get('#short-break-number')
      .type('{selectall}{backspace}200', { force: true })
      .trigger('change');
    cy.wait(WAIT_TIME);
    cy.get('#short-break-number').then(($el) => {
      expect($el).to.have.value(60);
    });
  });

  it('longBreakNumber inputs higher than upper bound become 60', { includeShadowDom: true }, () => {
    cy.get('#long-break-number')
      .type('{selectall}{backspace}200', { force: true })
      .trigger('change');
    cy.wait(WAIT_TIME);
    cy.get('#long-break-number').then(($el) => {
      expect($el).to.have.value(60);
    });
  });

  it('Stylesheet is switched when calling setDark()', { includeShadowDom: true }, () => {
    // Note: maybe add css checks for toggle bc now has pomo-toggle.css and -light.css
    cy.get('#settings-style').then(($el) => {
      expect($el).to.have.attr('href', './components/pomo-settings/pomo-settings.css');
    });
    cy.window().then((win) => {
      win.pomoSettings.setDark(false);
      cy.get('#settings-style').then(($el) => {
        expect($el).to.have.attr('href', './components/pomo-settings/pomo-settings-light.css');
      });
    });
    cy.window().then((win) => {
      win.pomoSettings.setDark(true);
      cy.get('#settings-style').then(($el) => {
        expect($el).to.have.attr('href', './components/pomo-settings/pomo-settings.css');
      });
    });
  });

  it('Values are set when calling loadSettings()', { includeShadowDom: true }, () => {
    // loadSettings()
    cy.window().then((win) => {
      win.pomoSettings.loadSettings(
        true,
        10,
        './assets/audio/bike_chime.mp3',
        true,
        20,
        10,
        20,
        true
      );
      expect(win.pomoSettings.work).to.eq(20);
      expect(win.pomoSettings.shortBreak).to.eq(10);
      expect(win.pomoSettings.longBreak).to.eq(20);
      expect(win.pomoSettings.volume).to.eq(10);
      expect(win.pomoSettings.sound).to.eq('./assets/audio/bike_chime.mp3');
      expect(win.pomoSettings.calm).to.eq(true);
      expect(win.pomoSettings.dark).to.eq(true);
      expect(win.pomoSettings.accessible).to.eq(true);
      // work
      cy.get('#work-number').then(($el) => {
        expect($el).to.have.value(20);
      });
      // short Break
      cy.get('#short-break-number').then(($el) => {
        expect($el).to.have.value(10);
      });
      // long Break
      cy.get('#long-break-number').then(($el) => {
        expect($el).to.have.value(20);
      });
      // volume
      cy.get('#volume-number').then(($el) => {
        expect($el).to.have.value(10);
      });
      cy.get('#volume-slide').then(($el) => {
        expect($el).to.have.value(10);
      });
      // sound
      cy.get('#sound-select').then(($el) => {
        expect($el).to.have.value('./assets/audio/bike_chime.mp3');
      });
      // calm
      cy.get('#calm-mode').then(($el) => {
        expect($el[0].style.display).to.eq('block');
      });
      // dark
      cy.get('#dark-mode').then(($el) => {
        expect($el[0].style.display).to.eq('block');
      });
      cy.get('#accessible-mode').then(($el) => {
        expect($el[0].style.display).to.eq('block');
      });
    });
  });

  it('disableSettings() disables settings besides volume', { includeShadowDom: true }, () => {
    cy.window().then((win) => {
      win.pomoSettings.disableSettings();
    });
    cy.get('#work-number').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
    cy.get('#short-break-number').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
    cy.get('#long-break-number').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
    cy.get('#calm-slider').then(($el) => {
      expect($el[0].style.pointerEvents).to.eq('none');
      expect($el[0].style.opacity).to.eq('0.6');
    });
    cy.get('#dark-slider').then(($el) => {
      expect($el[0].style.pointerEvents).to.eq('none');
      expect($el[0].style.opacity).to.eq('0.6');
    });
    cy.get('#accessible-slider').then(($el) => {
      expect($el[0].style.pointerEvents).to.eq('none');
      expect($el[0].style.opacity).to.eq('0.6');
    });
    cy.get('#volume-slide').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
    cy.get('#volume-number').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
  });

  it('enableSettings() enables all settings', { includeShadowDom: true }, () => {
    cy.window().then((win) => {
      win.pomoSettings.enableSettings();
    });
    cy.get('#work-number').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
    cy.get('#short-break-number').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
    cy.get('#long-break-number').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
    cy.get('#calm-slider').then(($el) => {
      expect($el[0].style.pointerEvents).to.eq('auto');
      expect($el[0].style.opacity).to.eq('1');
    });
    cy.get('#dark-slider').then(($el) => {
      expect($el[0].style.pointerEvents).to.eq('auto');
      expect($el[0].style.opacity).to.eq('1');
    });
    cy.get('#accessible-slider').then(($el) => {
      expect($el[0].style.pointerEvents).to.eq('auto');
      expect($el[0].style.opacity).to.eq('1');
    });
    cy.get('#volume-slide').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
    cy.get('#volume-number').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
  });

  it('changing volumeSlide fires appropriate events', { includeShadowDom: true }, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then(($el) => {
        const onVolumeSet = (e) => {
          expect(e.detail.volume()).to.eq(20);
          $el[0].removeEventListener('volumeSet', onVolumeSet);
          resolve();
        };
        $el[0].addEventListener('volumeSet', onVolumeSet);
        cy.get('#volume-slide').invoke('val', 20).trigger('change');
      });
    });
    cy.wrap(eventPromise);
  });

  it('changing volumeNumber fires appropriate events', { includeShadowDom: true }, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then(($el) => {
        const onVolumeSet = (e) => {
          expect(e.detail.volume()).to.eq(20);
          $el[0].removeEventListener('volumeSet', onVolumeSet);
          resolve();
        };
        $el[0].addEventListener('volumeSet', onVolumeSet);
        cy.get('#volume-number')
          .type('{selectall}{backspace}20', { force: true })
          .trigger('change');
      });
    });
    cy.wrap(eventPromise);
  });

  it('changing soundSelect fires appropriate events', { includeShadowDom: true }, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then(($el) => {
        const onSoundSet = (e) => {
          expect(e.detail.sound()).to.eq('./assets/audio/bike_chime.mp3');
          $el[0].removeEventListener('soundSet', onSoundSet);
          resolve();
        };
        $el[0].addEventListener('soundSet', onSoundSet);
        cy.get('#sound-select').select('./assets/audio/bike_chime.mp3');
      });
    });
    cy.wrap(eventPromise);
  });

  it('changing calmSwitch fires appropriate events', { includeShadowDom: true }, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then(($el) => {
        const onCalmSet = () => {
          $el[0].removeEventListener('calmSet', onCalmSet);
          resolve();
        };
        $el[0].addEventListener('calmSet', onCalmSet);
        cy.get('#calm-slider').click();
      });
    });
    cy.wrap(eventPromise);
  });

  it('changing darkSwitch fires appropriate events', { includeShadowDom: true }, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then(($el) => {
        const onDarkSet = () => {
          $el[0].removeEventListener('darkSet', onDarkSet);
          resolve();
        };
        $el[0].addEventListener('darkSet', onDarkSet);
        cy.get('#dark-slider').click();
      });
    });
    cy.wrap(eventPromise);
  });

  it('changing accessSwitch fires appropriate events', { includeShadowDom: true }, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then(($el) => {
        const onAccessSet = () => {
          $el[0].removeEventListener('accessSet', onAccessSet);
          resolve();
        };
        $el[0].addEventListener('accessSet', onAccessSet);
        cy.get('#accessible-slider').click();
      });
    });
    cy.wrap(eventPromise);
  });

  it('changing workMinuteNumber fires appropriate events', { includeShadowDom: true }, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then(($el) => {
        const onWorkSet = (e) => {
          expect(e.detail.work()).to.eq(20);
          $el[0].removeEventListener('workSet', onWorkSet);
          resolve();
        };
        $el[0].addEventListener('workSet', onWorkSet);
        cy.get('#work-number').type('{selectall}{backspace}20', { force: true }).trigger('change');
      });
    });
    cy.wrap(eventPromise);
  });

  it('changing shortBreakNumber fires appropriate events', { includeShadowDom: true }, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then(($el) => {
        const onShortBreakSet = (e) => {
          expect(e.detail.shortBreak()).to.eq(20);
          $el[0].removeEventListener('shortBreakSet', onShortBreakSet);
          resolve();
        };
        $el[0].addEventListener('shortBreakSet', onShortBreakSet);
        cy.get('#short-break-number')
          .type('{selectall}{backspace}20', { force: true })
          .trigger('change');
      });
    });
    cy.wrap(eventPromise);
  });

  it('changing longBreakNumber fires appropriate events', { includeShadowDom: true }, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then(($el) => {
        const onLongBreakSet = (e) => {
          expect(e.detail.longBreak()).to.eq(20);
          $el[0].removeEventListener('longBreakSet', onLongBreakSet);
          resolve();
        };
        $el[0].addEventListener('longBreakSet', onLongBreakSet);
        cy.get('#long-break-number')
          .type('{selectall}{backspace}20', { force: true })
          .trigger('change');
      });
    });
    cy.wrap(eventPromise);
  });

  it('Blank workNumber input fires events', { includeShadowDom: true }, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then(($el) => {
        const onWorkSet = (e) => {
          expect(e.detail.work()).to.eq(1);
          $el[0].removeEventListener('workSet', onWorkSet);
          resolve();
        };
        $el[0].addEventListener('workSet', onWorkSet);
        cy.get('#work-number').type('{selectall}{backspace}', { force: true }).trigger('change');
      });
    });
    cy.wrap(eventPromise);
  });

  it('Blank shortBreakNumber input fires events', { includeShadowDom: true }, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then(($el) => {
        const onShortBreakSet = (e) => {
          expect(e.detail.shortBreak()).to.eq(1);
          $el[0].removeEventListener('shortBreakSet', onShortBreakSet);
          resolve();
        };
        $el[0].addEventListener('shortBreakSet', onShortBreakSet);
        cy.get('#short-break-number')
          .type('{selectall}{backspace}', { force: true })
          .trigger('change');
      });
    });
    cy.wrap(eventPromise);
  });

  it('Blank longNumber input fires events', { includeShadowDom: true }, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then(($el) => {
        const onLongBreakSet = (e) => {
          expect(e.detail.longBreak()).to.eq(1);
          $el[0].removeEventListener('longBreakSet', onLongBreakSet);
          resolve();
        };
        $el[0].addEventListener('longBreakSet', onLongBreakSet);
        cy.get('#long-break-number')
          .type('{selectall}{backspace}', { force: true })
          .trigger('change');
      });
    });
    cy.wrap(eventPromise);
  });

  it('Blank volumeNumber input fires events', { includeShadowDom: true }, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then(($el) => {
        const onVolumeSet = (e) => {
          expect(e.detail.volume()).to.eq(0);
          $el[0].removeEventListener('volumeSet', onVolumeSet);
          resolve();
        };
        $el[0].addEventListener('volumeSet', onVolumeSet);
        cy.get('#volume-number').type('{selectall}{backspace}', { force: true }).trigger('change');
      });
    });
    cy.wrap(eventPromise);
  });
});

describe('Sidebar Testing with Accessibility', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });

  it('Sidebar opens when q is pressed & Accesibility is on', () => {
    cy.window().then((win) => {
      win.pomoSettings.setAccessibility(true);
    });
    cy.get('body').type('q');
    cy.get('#settings').then(($el) => {
      expect($el).to.have.attr('class', 'open');
    });
  });

  it('Sidebar closes when q is pressed & Accesibility is on', () => {
    cy.window().then((win) => {
      win.pomoSettings.setAccessibility(true);
    });
    cy.get('body').type('q');
    cy.get('body').type('q');
    cy.get('#settings').then(($el) => {
      expect($el).to.have.attr('class', 'close');
    });
  });

  it('Sidebar opens when q is pressed & Accesibility is off', () => {
    cy.window().then((win) => {
      win.pomoSettings.setAccessibility(true);
    });
    cy.get('body').type('q');
    cy.get('body').type('q');
    cy.window().then((win) => {
      win.pomoSettings.setAccessibility(false);
    });
    cy.get('body').type('q');
    cy.get('#settings').then(($el) => {
      expect($el).to.have.attr('class', 'close');
    });
  });

  it('Sidebar closes when q is pressed & Accesibility is off', () => {
    cy.window().then((win) => {
      win.pomoSettings.setAccessibility(true);
    });
    cy.get('body').type('q');
    cy.window().then((win) => {
      win.pomoSettings.setAccessibility(false);
    });
    cy.get('body').type('q');
    cy.get('#settings').then(($el) => {
      expect($el).to.have.attr('class', 'open');
    });
  });
});
