export class Mission {

    mission: number;
    name: string;
    enabled: boolean;

    constructor(mission: number, name: string) {
        this.mission = mission;
        this.name = name;
        this.enabled = false;
    }
}