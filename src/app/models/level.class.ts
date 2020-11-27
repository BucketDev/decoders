import { Mission } from "./mission.class";

export class Level {

    uid: string;
    level: number;
    name: string;
    missions: Mission[];
    enabled: boolean;

    constructor(level: number, name: string) {
        this.level = level;
        this.name = name;
        this.missions = [];
        this.enabled = false;
    }
}