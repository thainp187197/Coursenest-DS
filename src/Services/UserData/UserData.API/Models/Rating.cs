using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace UserData.API.Models;

[PrimaryKey(nameof(CourseId), nameof(UserId))]
public class Rating
{
    public Rating(string content)
    {
        Content = content;
    }

    [Range(0, 5)]
    public int Stars { get; set; }
    public string Content { get; set; }
    public DateTime Created { get; set; }

    // Relationship

    // External
    public int CourseId { get; set; }
    public int UserId { get; set; }
}
