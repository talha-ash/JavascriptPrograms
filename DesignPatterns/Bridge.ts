// Implementation interface
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
}

// Concrete Implementations
class TV implements Device {
  private on: boolean = false;
  private volume: number = 30;
  private channel: number = 1;

  isEnabled(): boolean {
    return this.on;
  }

  enable(): void {
    this.on = true;
    console.log("TV turned on");
  }

  disable(): void {
    this.on = false;
    console.log("TV turned off");
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    if (percent < 0) this.volume = 0;
    else if (percent > 100) this.volume = 100;
    else this.volume = percent;

    console.log(`TV volume set to ${this.volume}%`);
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
    console.log(`TV channel set to ${this.channel}`);
  }
}

class Radio implements Device {
  private on: boolean = false;
  private volume: number = 20;
  private channel: number = 88.5; // FM frequency

  isEnabled(): boolean {
    return this.on;
  }

  enable(): void {
    this.on = true;
    console.log("Radio turned on");
  }

  disable(): void {
    this.on = false;
    console.log("Radio turned off");
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    if (percent < 0) this.volume = 0;
    else if (percent > 100) this.volume = 100;
    else this.volume = percent;

    console.log(`Radio volume set to ${this.volume}%`);
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
    console.log(`Radio frequency set to ${this.channel} MHz`);
  }
}

// Abstraction
class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  togglePower(): void {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  channelDown(): void {
    this.device.setChannel(this.device.getChannel() - 1);
  }

  channelUp(): void {
    this.device.setChannel(this.device.getChannel() + 1);
  }
}

// Refined Abstraction
class AdvancedRemoteControl extends RemoteControl {
  mute(): void {
    this.device.setVolume(0);
    console.log("Device muted");
  }

  // Add more advanced features
  setChannel(channel: number): void {
    this.device.setChannel(channel);
  }
}

// Client code
function clientCode() {
  // Using the basic remote with TV
  const tv = new TV();
  const basicRemote = new RemoteControl(tv);

  basicRemote.togglePower(); // TV turned on
  basicRemote.channelUp(); // TV channel set to 2
  basicRemote.volumeUp(); // TV volume set to 40%

  // Using the advanced remote with Radio
  const radio = new Radio();
  const advancedRemote = new AdvancedRemoteControl(radio);

  advancedRemote.togglePower(); // Radio turned on
  advancedRemote.setChannel(104.5); // Radio frequency set to 104.5 MHz
  advancedRemote.mute(); // Device muted
}

// Run the client code
clientCode();

/*
Understanding the Bridge Pattern Implementation
Let's break down the key components of our Bridge pattern:
The Implementation Interface (Device)
The Device interface defines the core operations that any device should implement.
This forms our implementation layer where we'll add different device types.
Concrete Implementations (TV and Radio)

These classes provide specific implementations of the Device interface. Each has its
own behavior for turning on/off, setting volumes, and managing channels.
The Abstraction (RemoteControl)

The RemoteControl class provides a high-level interface for controlling devices.
It maintains a reference to a Device object, creating a "bridge" between the
abstraction and implementation hierarchies.
Refined Abstraction (AdvancedRemoteControl)

This extends the basic RemoteControl by adding more sophisticated features like
direct channel selection and muting. This demonstrates how we can extend the
abstraction independently from the implementations.
Key Benefits of the Bridge Pattern

Decoupling: The pattern decouples the abstraction from its implementation,
allowing them to vary independently.

Improved Extensibility: You can extend both the abstractions and implementations
without affecting each other. For example:

We can add a new device like SmartSpeaker without changing the remotes
We can add a new VoiceRemoteControl without touching the device classes


Hiding Implementation Details: Clients only interact with the abstraction layer,
keeping implementation details hidden.

Runtime Flexibility: You can switch implementations at runtime, making the
system more adaptable.
*/
