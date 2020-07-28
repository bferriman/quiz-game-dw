const router = require("express").Router();
const { sendQuizList, sendQuiz, checkAnswer } = require("../../controllers");

// Matches with "/api"

router.get("/quiz", sendQuizList);
router.get("/quiz/:quizName", sendQuiz);
router.post("/quiz/:quizName", checkAnswer);

module.exports = router;
