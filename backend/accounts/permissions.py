from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    """Anyone can read; only admin (staff) users can write."""
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class CreateAnyoneElseAdmin(permissions.BasePermission):
    """Anyone can POST (create); every other action needs an admin."""
    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return bool(request.user and request.user.is_staff)
