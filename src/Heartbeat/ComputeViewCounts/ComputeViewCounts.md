find all distinct feed_ids in views left join with view_counts max date
```SQL
SELECT views.feed_id, COALESCE(MAX(view_counts.created_at),'2014-04-01') as updated_at FROM views LEFT JOIN view_counts ON views.feed_id = view_counts.feed_id GROUP BY views.feed_id ORDER BY updated_at ASC
```

foreach feed_id
  foreach max_date to today
    foreach [bot / not bot]
      foreach [source]
        computeDailyViewCount
      end
    end
  end
  foreach max_date to this_month
    foreach [bot / not bot]
      foreach [source]
        computeMonthlyViewCount
      end
    end
    archiveMonthlyViews
  end
end
