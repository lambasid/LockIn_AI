import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  Users,
  Search,
  Briefcase,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Peer {
  id: string;
  name: string;
  avatar: string;
  role: string;
  university: string;
  location: string;
  connections: number;
  courses: string[];
  skills: string[];
}

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const defaultPeers: Peer[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
    role: "Computer Science Student",
    university: "Stanford University",
    location: "Stanford, CA",
    connections: 287,
    courses: ["CS101", "Data Structures", "Algorithms"],
    skills: ["Python", "Java", "React"],
  },
  {
    id: "2",
    name: "Bob Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
    role: "Mathematics Major",
    university: "MIT",
    location: "Cambridge, MA",
    connections: 342,
    courses: ["Linear Algebra", "Calculus III", "Number Theory"],
    skills: ["Mathematics", "LaTeX", "MATLAB"],
  },
  {
    id: "3",
    name: "Carol Martinez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol",
    role: "Physics Student",
    university: "Berkeley",
    location: "Berkeley, CA",
    connections: 198,
    courses: ["Quantum Mechanics", "Electromagnetism", "Statistical Physics"],
    skills: ["Python", "MATLAB", "Data Analysis"],
  },
];

const defaultPosts: Post[] = [
  {
    id: "1",
    userId: "1",
    userName: "Alice Johnson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
    userRole: "Computer Science Student",
    content:
      "Just finished my first machine learning project! Anyone else working on ML assignments?",
    timestamp: "2024-01-20T10:30:00Z",
    likes: 24,
    comments: 8,
  },
  {
    id: "2",
    userId: "2",
    userName: "Bob Wilson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
    userRole: "Mathematics Major",
    content:
      "Looking for study partners for the upcoming Linear Algebra midterm. Anyone interested?",
    timestamp: "2024-01-20T09:15:00Z",
    likes: 15,
    comments: 12,
  },
];

export const NetworkingScreen = () => {
  const [peers] = React.useState<Peer[]>(defaultPeers);
  const [posts] = React.useState<Post[]>(defaultPosts);
  const [newPost, setNewPost] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleCreatePost = () => {
    if (newPost.trim()) {
      // In a real app, this would be handled by your backend
      setNewPost("");
    }
  };

  const filteredPeers = peers.filter(
    (peer) =>
      peer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peer.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peer.courses.some((course) =>
        course.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Card className="p-6">
        <Tabs defaultValue="feed" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Academic Network</h1>
              <p className="text-sm text-muted-foreground">
                Connect with peers and share knowledge
              </p>
            </div>
            <TabsList>
              <TabsTrigger value="feed" className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Feed
              </TabsTrigger>
              <TabsTrigger value="peers" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Peers
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="feed" className="space-y-4">
            <Card className="p-4">
              <Textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your thoughts or ask a question..."
                className="mb-4"
              />
              <Button onClick={handleCreatePost}>Post</Button>
            </Card>

            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={post.userAvatar} />
                      <AvatarFallback>{post.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{post.userName}</h3>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {post.userRole}
                        </span>
                      </div>
                      <p className="mt-2">{post.content}</p>
                      <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
                        <Button variant="ghost" size="sm">
                          {post.likes} Likes
                        </Button>
                        <Button variant="ghost" size="sm">
                          {post.comments} Comments
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="peers" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, university, or courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPeers.map((peer) => (
                <Card key={peer.id} className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={peer.avatar} />
                      <AvatarFallback>{peer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{peer.name}</h3>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {peer.role}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          {peer.university}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {peer.location}
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-muted-foreground mb-2">
                          Courses:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {peer.courses.map((course, index) => (
                            <Badge key={index} variant="secondary">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="mt-4" variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default NetworkingScreen;
