export function ReviewsSection() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="section-header center">
          <span className="section-label reveal-text">Customer Reviews</span>
          <h2 className="section-title reveal-text">
            What Our <em>Customers</em> Say
          </h2>
          <p className="section-subtitle reveal-text">
            Don&apos;t just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="reviews-header reveal-card">
          <div className="reviews-rating">
            <span className="rating-number">5.0</span>
            <div className="rating-stars">★★★★★</div>
            <span className="rating-count">Based on Google Reviews</span>
          </div>
        </div>

        <div className="reviews-wrapper reveal-card">
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-header">
                <div className="review-stars">★★★★★</div>
              </div>
              <p className="review-text">
                "Absolutely amazing work! My car looks better than when I first bought it. The attention to detail is incredible."
              </p>
              <div className="review-author">
                <span className="author-name">John M.</span>
                <span className="review-date">2 weeks ago</span>
              </div>
            </div>

            <div className="review-card">
              <div className="review-header">
                <div className="review-stars">★★★★★</div>
              </div>
              <p className="review-text">
                "Got ceramic coating done and it looks phenomenal. Professional and honest. My go-to for detailing needs."
              </p>
              <div className="review-author">
                <span className="author-name">Sarah K.</span>
                <span className="review-date">1 month ago</span>
              </div>
            </div>

            <div className="review-card">
              <div className="review-header">
                <div className="review-stars">★★★★★</div>
              </div>
              <p className="review-text">
                "Third time using Vivid and they never disappoint. Fast, friendly service and my car always looks brand new."
              </p>
              <div className="review-author">
                <span className="author-name">Mike R.</span>
                <span className="review-date">3 weeks ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-cta">
          <a href="https://www.google.com/search?q=vivid+auto+details+elk+grove+reviews" target="_blank" className="btn-secondary">
            <span>View All Reviews</span>
          </a>
          <a href="https://g.page/r/vivid-auto-details/review" target="_blank" className="btn-primary">
            <span>Leave a Review</span>
          </a>
        </div>
      </div>
    </section>
  );
}
