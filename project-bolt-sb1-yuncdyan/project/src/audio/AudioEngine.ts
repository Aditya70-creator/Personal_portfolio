type SoundType = 'enter' | 'nodeActivate' | 'navigate' | 'sectionOpen' | 'sectionClose';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientNodes: OscillatorNode[] = [];
  private running = false;
  private muted = false;

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0;
      this.masterGain.connect(this.ctx.destination);
    } catch {
      // AudioContext not supported
    }
  }

  startAmbient() {
    if (!this.ctx || !this.masterGain || this.running) return;
    this.running = true;

    const ctx = this.ctx;

    // Low drone: sawtooth at 55Hz → lowpass
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const ambGain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.value = 55;
    osc2.type = 'sine';
    osc2.frequency.value = 110;
    osc3.type = 'triangle';
    osc3.frequency.value = 82.4; // E2

    filter.type = 'lowpass';
    filter.frequency.value = 280;
    filter.Q.value = 1.5;

    ambGain.gain.value = 0.09;

    // LFO for breathing effect
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.07;
    lfoGain.gain.value = 0.025;
    lfo.connect(lfoGain);
    lfoGain.connect(ambGain.gain);

    [osc1, osc2, osc3].forEach(o => o.connect(filter));
    filter.connect(ambGain);
    ambGain.connect(this.masterGain);

    [osc1, osc2, osc3, lfo].forEach(o => o.start());
    this.ambientNodes = [osc1, osc2, osc3, lfo];

    // Fade in
    this.masterGain.gain.setValueAtTime(0, ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(this.muted ? 0 : 0.7, ctx.currentTime + 2.5);
  }

  stopAmbient() {
    this.ambientNodes.forEach(n => {
      try { n.stop(); } catch { /* already stopped */ }
    });
    this.ambientNodes = [];
    this.running = false;
  }

  play(type: SoundType) {
    if (!this.ctx || this.muted) return;
    switch (type) {
      case 'enter':
        this.playEnter();
        break;
      case 'nodeActivate':
        this.playPing(880, 0.07, 0.25);
        break;
      case 'navigate':
        this.playNavigate();
        break;
      case 'sectionOpen':
        this.playSectionOpen();
        break;
      case 'sectionClose':
        this.playPing(330, 0.06, 0.2);
        break;
    }
  }

  private playPing(freq: number, vol: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + duration + 0.05);
    } catch { /* ignore */ }
  }

  private playEnter() {
    // Rising arpeggio
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playPing(freq, 0.08, 0.25), i * 75);
    });
  }

  private playNavigate() {
    this.playPing(440, 0.05, 0.12);
    setTimeout(() => this.playPing(660, 0.04, 0.1), 70);
  }

  private playSectionOpen() {
    this.playPing(220, 0.08, 0.5, 'triangle');
    setTimeout(() => this.playPing(880, 0.06, 0.3), 80);
    setTimeout(() => this.playPing(1320, 0.04, 0.2), 160);
  }

  fadeOut(duration = 1.5) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + duration);
  }

  fadeIn(duration = 1.5) {
    if (!this.ctx || !this.masterGain || this.muted) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.7, now + duration);
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.7, this.ctx.currentTime);
    }
    return this.muted;
  }

  isMutedState() { return this.muted; }
}

export const audioEngine = new AudioEngine();
export type { SoundType };
