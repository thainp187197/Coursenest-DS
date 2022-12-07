using System.Text.Json.Serialization;

namespace Library.API.Models;

public class Question
{
    public Question(string content)
    {
        Content = content;
    }

    public int QuestionId { get; set; }
    public string Content { get; set; }
    public int Point { get; set; }

    // Relationship
    public int ExamId { get; set; }
    public Exam Exam { get; set; } = null!;

    public List<Choice> Choices { get; set; } = new();
}
