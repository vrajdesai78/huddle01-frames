export interface PreviewPeer {
  displayName: string;
}

export interface previewPeersMetadata {
  roomId: string;
  previewPeers: PreviewPeer[];
}