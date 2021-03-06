import { EventBus } from "@/event-bus";
import { storageService } from "@/services/storage.service";
import { getEnigmaNumber, getLastEnigma } from "@/utils/helpers";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Template from "./AnswerForm.template.vue";

@Component({
  mixins: [Template]
})
export class AnswerFormComponent extends Vue {
  @Prop({ required: true }) public correctAnswer!: string;
  @Prop({ default: () => [] }) public rules!: Array<
    (v: string) => string | boolean
  >;
  public input = "";

  public onAnswer() {
    if (this.input.toLowerCase() === this.correctAnswer.toLowerCase()) {
      EventBus.$emit("loadOn");
      const enigma = getEnigmaNumber(this.$route.name);
      storageService.saveUserProgress(enigma);
      this.$router.push({
        name: +enigma + 1 <= getLastEnigma() ? `Enigma-${+enigma + 1}` : "Home"
      });
      setTimeout(() => {
        EventBus.$emit("loadOff");
      }, 4000);
    }
  }
}
