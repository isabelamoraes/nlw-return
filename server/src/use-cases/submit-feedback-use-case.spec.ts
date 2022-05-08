import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeebackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeebackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example content",
        screenshot: "data:image/png;base64,as54dfsd4f654sadf5sad5f",
      })
    ).resolves.not.toThrow();

    expect(createFeebackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example content",
        screenshot: "data:image/png;base64,as54dfsd4f654sadf5sad5f",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,as54dfsd4f654sadf5sad5f",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example content",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
