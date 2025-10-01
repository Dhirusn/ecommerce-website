import { Component } from '@angular/core';
import { Review } from '../../../../models/entity';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  public Math = Math;
  overallRating = 4.0;
  totalRatings = 35000;

  ratingBreakdown = [
    { stars: 5, count: 14000 },
    { stars: 4, count: 6000 },
    { stars: 3, count: 4000 },
    { stars: 2, count: 800 },
    { stars: 1, count: 9000 }
  ];

  categories = [
    { label: 'Cleanliness', score: 4.0 },
    { label: 'Safety & Security', score: 4.0 },
    { label: 'Staff', score: 4.0 },
    { label: 'Amenities', score: 3.5 },
    { label: 'Location', score: 3.0 },
  ];

  reviews: Review[] = [
    {
      user: 'Alexander Rity',
      avatar: 'https://i.pravatar.cc/40?img=3',
      date: '4 months ago',
      rating: 5.0,
      comment: 'Easy booking, great value! Cozy rooms at a reasonable price in Sheffield’s vibrant center. Highly recommended!',
      images: [
        'https://placehold.co/100x80?text=Room1',
        'https://placehold.co/100x80?text=Room2',
        'https://placehold.co/100x80?text=Room3'
      ]
    },
    {
      user: 'Emma Creight',
      avatar: 'https://i.pravatar.cc/40?img=5',
      date: '4 months ago',
      rating: 3.5,
      comment: 'Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield’s nightlife hub.'
    },
     {
      user: 'Emma Creight',
      avatar: 'https://i.pravatar.cc/40?img=5',
      date: '4 months ago',
      rating: 4.0,
      comment: 'Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield’s nightlife hub.'
    },
     {
      user: 'Emma Creight',
      avatar: 'https://i.pravatar.cc/40?img=5',
      date: '4 months ago',
      rating: 3.0,
      comment: 'Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield’s nightlife hub.'
    },
     {
      user: 'Emma Creight',
      avatar: 'https://i.pravatar.cc/40?img=5',
      date: '4 months ago',
      rating: 4.0,
      comment: 'Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield’s nightlife hub.'
    },
    {
      user: 'Alexander Rity',
      avatar: 'https://i.pravatar.cc/40?img=3',
      date: '4 months ago',
      rating: 5.0,
      comment: 'Easy booking, great value! Cozy rooms at a reasonable price in Sheffield’s vibrant center. Highly recommended!',
      images: [
        'https://placehold.co/100x80?text=Room1',
        'https://placehold.co/100x80?text=Room2',
        'https://placehold.co/100x80?text=Room3'
      ]
    },
    {
      user: 'Emma Creight',
      avatar: 'https://i.pravatar.cc/40?img=5',
      date: '4 months ago',
      rating: 4.0,
      comment: 'Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield’s nightlife hub.'
    },
     {
      user: 'Emma Creight',
      avatar: 'https://i.pravatar.cc/40?img=5',
      date: '4 months ago',
      rating: 4.0,
      comment: 'Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield’s nightlife hub.'
    },
     {
      user: 'Emma Creight',
      avatar: 'https://i.pravatar.cc/40?img=5',
      date: '4 months ago',
      rating: 4.0,
      comment: 'Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield’s nightlife hub.'
    },
  ];

  showAll = false;

  get visibleReviews() {
    return this.showAll ? this.reviews : this.reviews.slice(0, 2); // show only 2 initially
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }
}
