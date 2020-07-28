const router = require("express").Router();
const { sendQuizList, sendQuiz, checkAnswer } = require("../../controllers");

// Matches with "/api"

router.get("/quiz", sendQuizList);
router.get("/quiz/:quizId", sendQuiz);
router.post("/quiz/:quiId", checkAnswer);

module.exports = router;
