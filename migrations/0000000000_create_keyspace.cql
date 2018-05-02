CREATE KEYSPACE IF NOT EXISTS podcloud_stats 
  WITH REPLICATION = { 
    'class' : 'NetworkTopologyStrategy', 
    'datacenter1' : 3
  };
   